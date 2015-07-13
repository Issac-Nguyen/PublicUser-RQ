define(['kendo', 'underscore', '../common/common', '../common/helper'], function(kendo, _, common, helper) {
function updateDatasourceChart(e) {
     var defectList;
    if(e)
     defectList = e.sender.data();
    else
    defectList = $("#listDefects").data("kendoMobileListView").dataSource.data();
            var i = 1;
            for(var o in defectList) {
                var item = defectList[o];
                switch(i%3) {
                    case 0:
                        item.status = 'done';
                    break;
                    case 1:
                        item.status = 'half';
                    break;
                    case 2:
                        item.status = 'none';
                    break;
                }
                
                i++;
            }
            
            var data = _.countBy(defectList, function(o){
                    return o.status; 
            });
            
            var datasource = [];
            
            for(var o in data) {
                var item = {};
                item.category = o;
                item.value = data[o];
                
                datasource.push(item);
                }
    
    
    
    if( $("#chartDefect")) {
        
         $("#chartDefect").data("kendoChart").options.series[0].data = datasource;
        
        //datasource = kendo.data.DataSource.create({
        //                                                                                           data: datasource,
        //                                                                                       }),
       
        
        //$("#chartDefect").data("kendoChart").setDataSource(datasource);
         // $("#chartDefect").data("kendoChart").redraw();
    }
    
}
    
	return {
		init: function(initEvt) {
            helper.addIntoSubDefect({id: 'report', fn: updateDatasourceChart});
			// ... init event code ...
            $("#chartDefect").kendoChart({
                title: {
                    position: "top",
                    text: "Defects Status"
                },
                legend: {
                    visible: false
                },
                chartArea: {
                    height: common.windowHeight*80/100,
                    background: ""
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        background: "transparent",
                        template: "#= category #: \n #= value#%"
                    }
                },
                series: [{
                    type: "pie",
                    data: []
                }],
                tooltip: {
                    visible: true,
                    format: "{0}%"
                }
            });
            
            updateDatasourceChart();
		},

		beforeShow: function(beforeShowEvt) {
			// ... before show event code ...
		},

		show: function(showEvt) {
			// ... show event code ...
            $("#chartDefect").data("kendoChart").refresh();
		},

		viewModel: kendo.observable({
			message: 'report',
		}),
	}
});