let logoutBtn = new LogoutButton();
logoutBtn.action = function(){
	ApiConnector.logout(function(response){
		if(response.success){
			location.reload();
		}
	})
}

ApiConnector.current(function(response){
	if(response.success){
		ProfileWidget.showProfile(response.data)
	}
})

let ratesBoard = new RatesBoard();

function getStocks(){
	ApiConnector.getStocks(function(response){
		if(response.success){
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	})
}

getStocks();

setInterval(function(){ getStocks(); }, 60000);

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function(data){
	ApiConnector.addMoney(data, function(response){
		if(response.success){
			ProfileWidget.showProfile(response.data);
		}
		moneyManager.setMessage(response.success, response.success ? "Успех!" : response.error);
	})
}

moneyManager.conversionMoneyCallback = function(data){
	ApiConnector.convertMoney(data, function(response){
		if(response.success){
			ProfileWidget.showProfile(response.data);
		}
		moneyManager.setMessage(response.success, response.success ? "Успех!" : response.error);
	})
}

moneyManager.sendMoneyCallback = function(data){
	ApiConnector.transferMoney(data, function(response){
		if(response.success){
			ProfileWidget.showProfile(response.data);
		}
		moneyManager.setMessage(response.success, response.success ? "Успех!" : response.error);
	})
}

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(function(response){
	if(response.success){
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
})

favoritesWidget.addUserCallback = function(data){
	ApiConnector.addUserToFavorites(data, function(response){
		if(response.success){
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
		}
		favoritesWidget.setMessage(response.success, response.success ? "Успех!" : response.error);
	})
}

favoritesWidget.removeUserCallback = function(data){
	ApiConnector.removeUserFromFavorites(data, function(response){
		if(response.success){
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
		}
		favoritesWidget.setMessage(response.success, response.success ? "Успех!" : response.error);
	})
}