import { onBeforeUnmount, shallowRef, watch, type Ref } from 'vue';
import raf from '../../_util/raf';

/**
 * Runs the notice auto-close timer and reports progress updates.
 * Returns controls to pause and resume the timer.
 */
export default function useNoticeTimer(
  duration: Ref<number | false | null | undefined>,
  onClose: () => void,
  onUpdate: (ptg: number) => void,
) {
  const walking = shallowRef(false);
  let passTime = 0;
  let lastRafTime: number | null = null;
  let rafId: number;

  const durationMs = () => {
    const merged = typeof duration.value === 'number' ? duration.value : 0;
    return Math.max(merged, 0) * 1000;
  };

  const syncPassTime = () => {
    const now = Date.now();
    if (lastRafTime !== null) {
      passTime += now - lastRafTime;
    }
    lastRafTime = now;
  };

  const stopRaf = () => {
    raf.cancel(rafId);
    rafId = undefined as unknown as number;
  };

  const startRaf = () => {
    stopRaf();
    const step = () => {
      syncPassTime();
      const total = durationMs();
      if (passTime >= total) {
        onUpdate(1);
        walking.value = false;
        onClose();
      } else {
        onUpdate(Math.min(passTime / total, 1));
        rafId = raf(step);
      }
    };
    step();
  };

  const onPause = () => {
    if (!walking.value) {
      return;
    }
    syncPassTime();
    walking.value = false;
    stopRaf();
  };

  const onResume = () => {
    if (durationMs() <= 0) {
      onUpdate(0);
      return;
    }
    if (walking.value) {
      return;
    }
    lastRafTime = Date.now();
    walking.value = true;
    startRaf();
  };

  const reset = () => {
    stopRaf();
    passTime = 0;
    lastRafTime = null;
    onUpdate(0);
    if (durationMs() > 0) {
      walking.value = true;
      lastRafTime = Date.now();
      startRaf();
    } else {
      walking.value = false;
    }
  };

  watch(duration, () => {
    reset();
  });

  // kick off once mounted
  reset();

  onBeforeUnmount(() => {
    stopRaf();
  });

  return { onResume, onPause, reset };
}
