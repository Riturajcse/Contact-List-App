function AppCtrl($scope,$http){
	console.log("Hello from Controller");

	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			console.log("I got the requested data");
			$scope.contactlist = response;
			$scope.contact = '';
		});
	}
	refresh();
	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).success(function(response){
			console.log('From Server Add',response);
			//refresh();
			$scope.contactlist.push(response);
		})
	};

	$scope.remove = function(id,index){
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response){
			$scope.contactlist.splice(index,1);
		});
	};

	$scope.edit = function(index){
		console.log($scope.contactlist[index]);
		$scope.contact = $scope.contactlist[index];
	};

	$scope.update = function(){
		console.log($scope.contact);
		$http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response){
			//refresh();
		});
	};

	$scope.deselect = function(){
		$scope.contact='';
	}

}
