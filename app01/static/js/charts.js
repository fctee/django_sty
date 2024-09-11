/**
 * 初始化饼状图
 */
function initPie() {
// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('m2'));
    var option = {
        title: {
            text: '费用占比',
            subtext: '云厂商',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: 0
        },
        series: [
            {
                name: '费用',
                type: 'pie',
                radius: '50%',
                data: [],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    $.ajax({
        url: "/bill/pie/",
        type: "get",
        dataType: "JSON",
        success: function (res) {
            if (res.status === 200) {
                option.series[0].data = res.data;
                myChart.setOption(option);
            } else {
                console.error('Unexpected status code:', res.status)
            }
        },
        error: function (res) {
            console.error('Error fetching data:', res);
        }
    });
}

/**
 * 初始化柱状图
 */
function initBar() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('m1'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: "部门费用表",
            subtext: "按部分划分",
            left: "center",
        },
        tooltip: {},
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        dataset: [
            {
                dimensions: ['department', 'total_amount'],
                source: []
            },
            {
                transform: {
                    type: 'sort',
                    config: {dimension: 'total_amount', order: 'desc'}
                }
            }
        ],
        xAxis: {
            type: 'category',
            axisLabel: {interval: 0, rotate: 30, fontSize: 10}
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '部门费用',
            type: 'bar',
            encode: {x: 'department', y: 'total_amount'},
            datasetIndex: 1,
            barWidth: '60%',
            colorBy: "data"
        }]
    };

    $.ajax({
        url: "/bill/bar/",
        type: "get",
        dataType: "JSON",
        success: function (res) {
            // 将后台返回的数据，更新到option中。
            if (res.status === 200) {
                // option.dataset[0].source = res.data.source;
                option.dataset[0].source = res.data;

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            } else {
                console.error('Unexpected status code:', res.status)
            }
        },
        error: function (res) {
            console.error('Error fetching data:', res);
        }
    });
}