(function(window){  
  var $ = window.$;
  var params = {
    AircraftPrice: {
      caption: "Aircraft purchase price",
      default: 50000
    },
    InsuranceCost: {
      caption: "Yearly insurance cost",
      default: 600,
    },
    HangarCost: {
      caption: "Monthly hangar cost",
      default: 180
    },
    AircraftDepreciation: {
      caption: "Yearly aircraft depreciation (%)",
      default: 5
    },
    LabourMaintenanceCostPer50Hours: {
      caption: "Maintenance cost per 50 hours (labour)",
      default: 400
    },
    MaterialsMaintenanceCostPer50Hours: {
      caption: "Maintenance cost per 50 hours (materials)",
      default: 400
    },
    FuelConsumptionPerHour: {
      caption: "Fuel consumption per hour (liters/h)",
      default: 15
    },
    FuelPricePerLiter: {
      caption: "Fuel price per liter",
      default: 1.36
    },
    RentingCost: {
      caption: "Renting cost per hour",
      default: 120
    }    
  };
  
  function fetchValue(name) {
    var param = params[name];
    if (!param) throw "Undefined parameter: " + name;
    
    var value = $('#param_' + name).children('input').val();
    if ((value = parseFloat(value)) == NaN) {
      alert("Invalid values. Please check them and try again");
      throw "Invalid values";
    }
    return value;
  }
  
  function calculate() {
    var buyingCostFixed = 
        fetchValue('InsuranceCost') +
        fetchValue('HangarCost') * 12 +
        (fetchValue('AircraftDepreciation') / 100) * fetchValue('AircraftPrice')
    ;
    
    var buyingCostVariable =
        fetchValue('LabourMaintenanceCostPer50Hours') / 50 +
        fetchValue('MaterialsMaintenanceCostPer50Hours') / 50 +
        fetchValue('FuelPricePerLiter') * fetchValue('FuelConsumptionPerHour')
    ;
    
    var rentingCost = fetchValue('RentingCost');
    
    var minHours = Math.ceil(buyingCostFixed / (rentingCost - buyingCostVariable));
    $('#result').text(minHours);
  }
  
  function init() {
    for (var name in params) {
      var param = params[name];
      var elem = $('#param_' + name);
      
      elem.children('label').text(param.caption);
      elem.children('input')
        .attr('type', 'number')
        .attr('step', '0.01')
        .val(param.default)
      ;
    }
    
    $('#calc').click(calculate);
  }
  
  window.Calc = {
    init: init
  };
})(window);
