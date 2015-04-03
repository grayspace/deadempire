function DeadEmpireCtrl($scope, $interval) {
  // Define variables & set starting values   
  // For main stats
  $scope.numMoney = 300;
  $scope.numSupplies = 0;
  $scope.numSuppliesMax = 50;
  $scope.scavengeSuppliesInc = 1;
  $scope.sellSuppliesInc = 1;
  $scope.numTotalKills = 0;
  $scope.numPersonalKills = 0;
  // For Employees
  $scope.numCrew = 0;
  $scope.crewCost = 50;
  $scope.crewCostInc = 1.1;
  $scope.crewScavengePS = 0.5;
  $scope.numVetCrew = 0;
  $scope.vetCrewCost = 200;
  $scope.vetCrewCostInc = 1.1;
  $scope.vetCrewScavengePS = 1;
  $scope.numBosses = 0;
  $scope.bossCost = 400;
  $scope.bossCostInc = 1.1;
  $scope.bossSellSuppliesPS = 1.8;
  // For Buildings
  $scope.numCaches = 0;
  $scope.cacheCost = 100;
  $scope.cacheCostInc = 1.1;
  $scope.cacheCap = 10;
  $scope.cacheCapInc = .8;
  $scope.numVehicles = 0;
  $scope.vehicleCost = 300;
  $scope.vehicleCostInc = 1.1;
  $scope.vehicleCap = 20;
  $scope.vehicleCapInc = 1.5;
  $scope.numBases = 0;
  $scope.baseCost = 1000;
  $scope.baseCostInc = 1.1;
  $scope.baseCap = 50;
  // For Upgrades (TO DO)
  $scope.numUpgradeWeapons = 0;
  $scope.upgradeWeaponsCost = 150;
  $scope.upgradeWeaponsCostInc = 1.1;

  // Kill, Scavenge & Sell Buttons
  // Increase numMoney (x1) every time kill zombie button is clicked
  $scope.killZombie = function() {
    $scope.numMoney++;
    $scope.numTotalKills++;
    $scope.numPersonalKills++;
  };
  // Increase numSupplies (x1) every time scavenge button is clicked
  $scope.scavenge = function() {
    $scope.numSupplies += (1 * $scope.scavengeSuppliesInc);
    $scope.scavengeSuppliesInc += .02;
  };
  // Deduct from numSupplies & increase numMoney (x sellSuppliesInc) every time sell button is clicked
  $scope.sellSupplies = function() {
    if ($scope.numSupplies >= 0) {
      $scope.numSupplies -= (1 * $scope.sellSuppliesInc);
      $scope.numMoney += (1 * $scope.sellSuppliesInc);
      $scope.sellSuppliesInc += .015;
    }
  };

  // Apply multipliers, deduct cost of unit & increase cost of next unit
  // For Employees
  $scope.hireCrew = function() {
    $scope.numCrew++;
    $scope.scavengeSuppliesInc += .001;
    $scope.sellSuppliesInc += .001;
    $scope.numMoney -= $scope.crewCost;
    $scope.crewCost = Math.ceil($scope.crewCost * $scope.crewCostInc);
  };
  $scope.hireVetCrew = function() {
    $scope.numVetCrew++;
    $scope.scavengeSuppliesInc += .004;
    $scope.sellSuppliesInc += .004;
    $scope.numMoney -= $scope.vetCrewCost;
    $scope.vetCrewCost = Math.ceil($scope.vetCrewCost * $scope.vetCrewCostInc);
  };
  $scope.hireBoss = function() {
    $scope.numBosses++;
    $scope.scavengeSuppliesInc += .009;
    $scope.sellSuppliesInc += .009;
    $scope.numMoney -= $scope.bossCost;
    $scope.bossCost = Math.ceil($scope.bossCost * $scope.bossCostInc);
  };

  // For Builds
  $scope.buildCache = function() {
    $scope.numCaches++;
    $scope.numSuppliesMax += $scope.cacheCap;
    $scope.cacheCap += $scope.cacheCapInc;
    $scope.numMoney -= $scope.cacheCost;
    $scope.cacheCost = Math.ceil($scope.cacheCost * $scope.cacheCostInc);
  };
  $scope.buildVehicle = function() {
    $scope.numVehicles++;
    $scope.scavengeSuppliesInc += .02;
    $scope.sellSuppliesInc += .5;
    $scope.numSuppliesMax += $scope.vehicleCap;
    $scope.vehicleCap += $scope.vehicleCapInc;
    $scope.numMoney -= $scope.vehicleCost;
    $scope.vehicleCost = Math.ceil($scope.vehicleCost * $scope.vehicleCostInc);
  };
  $scope.buildBase = function() {
    $scope.numBases++;
    $scope.scavengeSuppliesInc += .5;
    $scope.sellSuppliesInc += .05;
    $scope.numSuppliesMax += $scope.baseCap;
    $scope.numMoney -= $scope.baseCost;
    $scope.baseCost = Math.ceil($scope.baseCost * $scope.baseCostInc);
    $scope.baseCap += (($scope.cacheCap) * .3);
  };

  // For Upgrades (TO DO)
  $scope.upgradeWeapons = function() {
    $scope.numUpgradeWeapons++;
    $scope.numMoney -= $scope.upgradeWeaponsCost;
    $scope.upgradeWeaponsCost = Math.ceil($scope.upgradeWeaponsCost * $scope.upgradeWeaponsCostInc);
  };

  // Interval timer - does not calculate time away from browser tab (IN USE)
  $interval(function() {
    $scope.oldTimer++;
    // Count Money & Zombie Kills - add x per second (x / 100 every 10ms)
    // For Crews
    $scope.crewKillRatePS = ($scope.numCrew * 1.5 / 100);
    $scope.numMoney += $scope.crewKillRatePS;
    $scope.numTotalKills += $scope.crewKillRatePS;
    // For Vet Crews
    $scope.vetCrewKillRatePS = ($scope.numVetCrew * 3 / 100);
    $scope.numMoney += $scope.vetCrewKillRatePS;
    $scope.numTotalKills += $scope.vetCrewKillRatePS;
    // For Bosses
    $scope.bossesKillRatePS = ($scope.numBosses * 3 / 100);
    $scope.numMoney += $scope.bossesKillRatePS;
    $scope.numTotalKills += $scope.bossesKillRatePS;

    if ($scope.numSupplies < $scope.numSuppliesMax) {
      // Crews scavenge supplies automatically
      // Supplies add x per second (x / 100 every 10ms)
      $scope.numSupplies += ($scope.numCrew * $scope.crewScavengePS / 100);
      $scope.numSupplies += ($scope.numVetCrew * $scope.vetCrewScavengePS / 100);
      if ($scope.numSupplies >= 0) {
        // Bosses sell Supplies automatically
        $scope.numMoney += ($scope.numBosses * $scope.bossSellSuppliesPS / 100);
        $scope.numSupplies -= ($scope.numBosses * $scope.bossSellSuppliesPS / 100);
      }
    }
    // For Upgrades (TO DO)
    //$scope.numMoney += ($scope.numUpgradeWeapons * 10 / 100);
  }, 10);
  
    // New interval timer - calculates time away from browser tab (NOT IN USE YET)
  $scope.delay = (10);
  $scope.now = new Date();
  $scope.before = new Date();
  $interval(function() {
    $scope.now = new Date();
    var elapsedTime = ($scope.now.getTime() - $scope.before.getTime());
    if (elapsedTime > $scope.delay)
    // Recover time lost while inactive
      $scope.newTimer += Math.floor(elapsedTime / $scope.delay);
    else $scope.newTimer++;
    $scope.before = new Date();
  }, $scope.delay);
  
}
