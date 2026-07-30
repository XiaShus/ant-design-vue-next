import { mount } from '@vue/test-utils';
import Table from '..';
import * as Vue from 'vue';
import mountTest from '../../../tests/shared/mountTest';
import { sleep } from '../../../tests/utils';

const { Column, ColumnGroup } = Table;

describe('Table', () => {
  mountTest(Table);
  const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
    },
  ];

  it('renders JSX correctly', done => {
    const wrapper = mount(
      {
        render() {
          return (
            <Table dataSource={data} pagination={false}>
              <ColumnGroup title="Name">
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
              </ColumnGroup>
              <Column title="Age" dataIndex="age" key="age" />
            </Table>
          );
        },
      },
      { sync: false },
    );

    Vue.nextTick(() => {
      expect(wrapper.html()).toMatchSnapshot();
      done();
    });
  });

  it('updates columns when receiving props', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const wrapper = mount(Table, {
      props: {
        columns,
      },
      sync: false,
    });
    const newColumns = [
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
      },
    ];
    wrapper.setProps({ columns: newColumns });
    await sleep();
    expect(wrapper.find('th').text()).toEqual('Title');
  });

  it('loading with Spin', async () => {
    const loading = {
      spinning: false,
      delay: 500,
    };
    const wrapper = mount(Table, {
      props: {
        loading,
      },
      sync: false,
    });
    await sleep();
    expect(wrapper.findAll('.ant-spin')).toHaveLength(0);
    expect(wrapper.find('.ant-table-placeholder').text()).not.toEqual('');

    loading.spinning = true;
    wrapper.setProps({ loading: { ...loading } });
    await sleep();
    expect(wrapper.findAll('.ant-spin')).toHaveLength(0);

    await sleep(500);
    expect(wrapper.findAll('.ant-spin')).toHaveLength(1);
  });

  it('hides columns with hidden prop', async () => {
    const columns = [
      { title: 'Name', dataIndex: 'firstName', key: 'firstName' },
      { title: 'Age', dataIndex: 'age', key: 'age', hidden: true },
      { title: 'Last', dataIndex: 'lastName', key: 'lastName' },
    ];
    const wrapper = mount(Table, {
      props: {
        columns,
        dataSource: data,
        pagination: false,
      },
      sync: false,
    });
    await sleep();
    const headers = wrapper.findAll('th').map(th => th.text());
    expect(headers).toContain('Name');
    expect(headers).toContain('Last');
    expect(headers).not.toContain('Age');
    expect(wrapper.findAll('tbody tr').at(0).findAll('td')).toHaveLength(2);
  });

  it('align column should not override cell style', done => {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        customCell: () => {
          return {
            style: {
              color: 'red',
            },
          };
        },
      },
    ];
    const wrapper = mount(Table, {
      props: {
        columns,
        dataSource: data,
      },
      sync: false,
    });
    Vue.nextTick(() => {
      expect(wrapper.html()).toMatchSnapshot();
      done();
    });
  });
});
