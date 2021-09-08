import { Component } from '@angular/core';
import { AnnonceService } from 'app/back/annonce.service';
import Annonce from 'app/back/models/annonce';
import { Appointment } from 'app/back/models/appointment';
import { AppointmentService } from 'app/back/services/appointments.service';
import { ClientService } from 'app/back/services/client.service';
import Client from 'app/front/_models/client';
import Reclamation from 'app/front/_models/reclamation';
import { ReclamationService } from 'app/front/_services/reclamation.service';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import { Chart, ChartLegendOptions } from 'chart.js';
import { DashboardService } from 'app/back/services/dashboard.service';
declare var require: any;

const data: any = require('../../../shared/data/chartist.json');

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component {
    chart1 =[];
    chart2 =[];
    chart3 =[];
    chart4 =[];
    chart5 =[];
    chart6 =[];
    chart7=[];
    chart8=[];
    chart9=[];
    chart10=[];
    chart11=[];
    chart12=[];
    chart13=[];
    chart14=[];
    nbAnnonces:number;
    nbRDVs:number;
    nbreRec:number;
    nbrClients:number;
    clients:Client[];
    ConfirmedRec:number;
    RejectedRec:number;
    constructor(
      private  annonceService:AnnonceService,
      private appointmentService:AppointmentService,
      private reclamationService:ReclamationService,
      private clientService:ClientService,
      private dashboardService:DashboardService
) { }
    
      ngOnInit(): void {
    this.getAllAnnonces()
    this. getAllAppointmets()
    this.getReclamations()
    this.getListClients()
    this.getReclamationWithDate()
    this.StatisticsAppointmentWithDate()
        // this.userr=JSON.parse(sessionStorage.getItem('user'));
       // console.log(this.user) 
     
      }
    
    getAllAnnonces(){
        this.annonceService.getAnnonces().subscribe((res:Annonce[]) =>{
        console.log("res",res)
      this.nbAnnonces=res.length
      
        })
      } 

      getReclamations(){

        this.reclamationService.getAllReclamations().subscribe((res:Reclamation[]) =>{
          console.log("res",res)
           this.nbreRec=res.length;
         let ConfirmedRec = res.filter((rec)=>rec.etat==='Processed').length;
           let RejectedRec = res.filter((rec)=>rec.etat==='Refused').length;
           console.log("this.ConfirmedRec",this.ConfirmedRec)
           console.log("this.RejectedRec",this.RejectedRec)
      
  /*        var canvas = <HTMLCanvasElement> document.getElementById("canvas");
         var ctx = canvas.getContext("2d"); */
         this.chart7 = <any> new Chart('ctx', {
            type: 'doughnut',
            data: {
              labels: [ 'reclamations acceptées',
              'reclamations refusées',],
              datasets: [
                {
                  data: [ConfirmedRec,RejectedRec],
                  backgroundColor:['#32CD32','#FF7F50']
        
                },
        
              ],
        
        
            },
            options: {
              responsive: true,
        
              }
        
        
          })
        })
      }
      getReclamationWithDate(){

        this.dashboardService.StatisticsReclamationsWithDate().subscribe((res:any) =>{
          console.log("res",res)
           this.nbreRec=res.length;
          let TotalDays=[]
          let TotalDayReclamation=[]
          res.forEach(element=>{
console.log("element",element._id)
        TotalDays.push(element._id)
        TotalDayReclamation.push(element.totalUnitsSold)
          })
          // let TotalDayReclamation = res.filter((rec)=>rec.etat==='Refused');
           console.log("TotalDays",TotalDays)
           console.log("TotalDayReclamation",TotalDayReclamation)
      
  /*        var canvas = <HTMLCanvasElement> document.getElementById("canvas");
         var ctx = canvas.getContext("2d"); */
         this.chart2 = <any> new Chart('canvas', {
            type: 'line',
            data: {
             labels: TotalDays,
              datasets: [
                {
              data: TotalDayReclamation,
                  borderColor: '#3cba9f',
                  backgroundColor: '#3cba9f',
                 // fill: false
                }
              ]
            },
            options: {
      
                responsive: true,
      
      
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: true,
                  ticks: {
                    beginAtZero:true
                }
                }],
                yAxes: [{
                  display: true
                }]
              }
            }
          })
        })
      }
    

      getAllAppointmets(){
  
        this.appointmentService.getAllRDV().subscribe((res:Appointment[]) =>{
          console.log("res",res)
           this.nbRDVs=res.length;
           let ConfirmedRDV = res.filter((rdv)=>rdv.status==='Confirmed').length;
           let RejectedRDV = res.filter((rdv)=>rdv.status==='Canceled').length;
           this.chart1 = <any> new Chart('ch1', {
            type: 'doughnut',
            data: {
              labels: [ 'Rendez-vous confirmés',
              'Rendez-vous annulés',],
              datasets: [
                {
                  data: [ConfirmedRDV,RejectedRDV],
                  backgroundColor:['rgba(95, 140, 255, 1)','rgba(255, 18, 0, 0.65)']
        
                },
        
              ],
        
        
            },
            options: {
              responsive: true,
        
              }
        
        
          })
         })
        
    }

    StatisticsAppointmentWithDate(){
        this.dashboardService.StatisticsAppointmentWithDate().subscribe((res:any) =>{
            console.log("res",res)
            let TotalDays=[]
            let TotalDayAppointment=[]
            res.forEach(element=>{
  console.log("element",element._id)
          TotalDays.push(element._id)
          TotalDayAppointment.push(element.totalUnitsSold)
            })
            // let TotalDayReclamation = res.filter((rec)=>rec.etat==='Refused');
             console.log("TotalDays",TotalDays)
             console.log("TotalDayAppointment",TotalDayAppointment)
        
    /*        var canvas = <HTMLCanvasElement> document.getElementById("canvas");
           var ctx = canvas.getContext("2d"); */
           this.chart3 = <any> new Chart('canva', {
              type: 'line',
              data: {
               labels: TotalDays,
                datasets: [
                  {
                data: TotalDayAppointment,
                    borderColor: '#FF8C00',
                    backgroundColor: '#FF8C00',
                   // fill: false
                  }
                ]
              },
              options: {
        
                  responsive: true,
        
        
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    display: true,
                    ticks: {
                      beginAtZero:true
                  }
                  }],
                  yAxes: [{
                    display: true
                  }]
                }
              }
            })
          })
    }
    getListClients() {
        this.clientService.getListClients().subscribe((res: Client[]) => {
          console.log("res",res)
          this.clients = res.filter((client)=>client.role==='Client');
          this.nbrClients=this.clients.length;
          console.log(this.clients)
         // this.SpinnerService.hide();
        });
     
      }
    


    // Line area chart configuration Starts
    lineArea: Chart = {
        type: 'Line',
        data: data['lineAreaDashboard'],
        options: {
            low: 0,
            showArea: true,
            fullWidth: true,
            onlyInteger: true,
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            },
            axisX: {
                showGrid: false
            }
        },
        events: {
            created(data: any): void {
                var defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient',
                    x1: 0,
                    y1: 1,
                    x2: 1,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(0, 201, 255, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(146, 254, 157, 1)'
                });

                defs.elem('linearGradient', {
                    id: 'gradient1',
                    x1: 0,
                    y1: 1,
                    x2: 1,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(132, 60, 247, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(56, 184, 242, 1)'
                });
            },

        },
    };
    // Line area chart configuration Ends

    // Stacked Bar chart configuration Starts
    Stackbarchart: Chart = {
        type: 'Bar',
        data: data['Stackbarchart'],
        options: {
            stackBars: true,
            fullWidth: true,
            axisX: {
                showGrid: false,
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                offset: 0
            },
            chartPadding: 30
        },
        events: {
            created(data: any): void {
                var defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'linear',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(0, 201, 255,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(17,228,183, 1)'
                });
            },
            draw(data: any): void {
                if (data.type === 'bar') {
                    data.element.attr({
                        style: 'stroke-width: 5px',
                        x1: data.x1 + 0.001
                    });

                }
                else if (data.type === 'label') {
                    data.element.attr({
                        y: 270
                    })
                }
            }
        },
    };
    // Stacked Bar chart configuration Ends

    // Line area chart 2 configuration Starts
    lineArea2: Chart = {
        type: 'Line',
        data: data['lineArea2'],
        options: {
            showArea: true,
            fullWidth: true,
            lineSmooth: Chartist.Interpolation.none(),
            axisX: {
                showGrid: false,
            },
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            }            
        },
        responsiveOptions: [
            ['screen and (max-width: 640px) and (min-width: 381px)', {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                }
            }],
            ['screen and (max-width: 380px)', {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 3 === 0 ? value : null;
                    }
                }
            }]
        ],
        events: {
            created(data: any): void {
                var defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient2',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(255, 255, 255, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(0, 201, 255, 1)'
                });

                defs.elem('linearGradient', {
                    id: 'gradient3',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0.3,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(255, 255, 255, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(132, 60, 247, 1)'
                });
            },
            draw(data: any): void {
                var circleRadius = 4;
                if (data.type === 'point') {

                    var circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: circleRadius,
                        class: 'ct-point-circle'
                    });
                    data.element.replace(circle);
                }
                else if (data.type === 'label') {
                    // adjust label position for rotation
                    const dX = data.width / 2 + (30 - data.width)
                    data.element.attr({ x: data.element.attr('x') - dX })
                }
            }
        },
    };
    // Line area chart 2 configuration Ends

    // Line chart configuration Starts
    lineChart: Chart = {
        type: 'Line', data: data['LineDashboard'],
        options: {
            axisX: {
                showGrid: false
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                low: 0,
                high: 100,
                offset: 0,
            },
            fullWidth: true,
            offset: 0,
        },
        events: {
            draw(data: any): void {
                var circleRadius = 4;
                if (data.type === 'point') {
                    var circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: circleRadius,
                        class: 'ct-point-circle'
                    });

                    data.element.replace(circle);
                }
                else if (data.type === 'label') {
                    // adjust label position for rotation
                    const dX = data.width / 2 + (30 - data.width)
                    data.element.attr({ x: data.element.attr('x') - dX })
                }
            }
        },

    };
    // Line chart configuration Ends

    // Donut chart configuration Starts
    DonutChart: Chart = {
        type: 'Pie',
        data: data['donutDashboard'],
        options: {
            donut: true,
            startAngle: 0,
            labelInterpolationFnc: function (value) {
                var total = data['donutDashboard'].series.reduce(function (prev, series) {
                    return prev + series.value;
                }, 0);
                return total + '%';
            }
        },
        events: {
            draw(data: any): void {
                if (data.type === 'label') {
                    if (data.index === 0) {
                        data.element.attr({
                            dx: data.element.root().width() / 2,
                            dy: data.element.root().height() / 2
                        });
                    } else {
                        data.element.remove();
                    }
                }

            }
        }
    };
    // Donut chart configuration Ends

    //  Bar chart configuration Starts
    BarChart: Chart = {
        type: 'Bar', data: data['DashboardBar'], options: {
            axisX: {
                showGrid: false,
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                offset: 0
            },
            low: 0,
            high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        },
        responsiveOptions: [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ],
        events: {
            created(data: any): void {
                var defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient4',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(238, 9, 121,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(255, 106, 0, 1)'
                });
                defs.elem('linearGradient', {
                    id: 'gradient5',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(0, 75, 145,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(120, 204, 55, 1)'
                });

                defs.elem('linearGradient', {
                    id: 'gradient6',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(132, 60, 247,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(56, 184, 242, 1)'
                });
                defs.elem('linearGradient', {
                    id: 'gradient7',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(155, 60, 183,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(255, 57, 111, 1)'
                });

            },
            draw(data: any): void {
                var barHorizontalCenter, barVerticalCenter, label, value;
                if (data.type === 'bar') {

                    data.element.attr({
                        y1: 195,
                        x1: data.x1 + 0.001
                    });

                }
            }
        },

    };
    // Bar chart configuration Ends

    // line chart configuration Starts
    WidgetlineChart: Chart = {
        type: 'Line', data: data['WidgetlineChart'],
        options: {
            axisX: {
                showGrid: true,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 40,
                showLabel: false,
                offset: 0,
            },
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            fullWidth: true,
        },
    };
    // Line chart configuration Ends

}
