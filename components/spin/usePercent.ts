import { computed, onBeforeUnmount, ref, watch, type ComputedRef, type Ref } from 'vue';

const AUTO_INTERVAL = 200;
const STEP_BUCKETS: [number, number][] = [
  [30, 0.05],
  [70, 0.03],
  [96, 0.01],
];

/** Resolve Spin `percent` / `auto` mock progress (antd ≥ 5.18). */
export default function usePercent(
  spinning: Ref<boolean>,
  percent: Ref<number | 'auto' | undefined>,
): ComputedRef<number | undefined> {
  const mockPercent = ref(0);
  let mockInterval: ReturnType<typeof setInterval> | null = null;

  const clear = () => {
    if (mockInterval) {
      clearInterval(mockInterval);
      mockInterval = null;
    }
  };

  watch(
    [spinning, percent],
    () => {
      clear();
      if (percent.value === 'auto' && spinning.value) {
        mockPercent.value = 0;
        mockInterval = setInterval(() => {
          const prev = mockPercent.value;
          const restPTG = 100 - prev;
          for (let i = 0; i < STEP_BUCKETS.length; i += 1) {
            const [limit, stepPtg] = STEP_BUCKETS[i];
            if (prev <= limit) {
              mockPercent.value = prev + restPTG * stepPtg;
              return;
            }
          }
        }, AUTO_INTERVAL);
      }
    },
    { immediate: true },
  );

  onBeforeUnmount(clear);

  return computed(() => (percent.value === 'auto' ? mockPercent.value : percent.value));
}
