
/**
 *   开发环境 webpack ./src/index.js -o ./build/built.js --mode=development
 *  生产环境   webpack ./src/index.js -o ./build/built.js --mode=production
 */
import './index.less'
import moment from 'moment'
Vue.prototype.$moment = moment
new Vue({
    el: '#app',
    data: {
        visible: false,
        datas: '请输入',
        columns1: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]
    },
    methods: {
        show: function () {
            this.visible = true;
        },
        handleChange(data) {
            console.log(data)
        }
    },
    mounted () {
 // 本月
let beginTime = this.$moment()
.startOf("month")
.format("YYYY-MM-DD 00:00:00");
let endTime = this.$moment()
.endOf("month")
.format("YYYY-MM-DD 00:00:00");
console.log(beginTime, endTime);
    }
})