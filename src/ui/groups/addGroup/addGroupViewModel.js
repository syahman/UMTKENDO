(function(wrn){

	'use strict';

	//below you place anything private you don't want exposed in the viewModel

	//below we create the viewModel

	wrn.addGroup = {//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
		viewModel: kendo.observable({
			//the actual model
			modelData: wrn.groupModel,
			//other properties or functions you want to observe and expose to html
			init:function(){
				this.addButton = $('#addGroupBtn').data('kendoMobileButton');
				var addButton = this.addButton;
				$('#addGroupInput').on('change input',function(e){
					if($(e.target).val().replace(' ','') !== ''){
						addButton.enable(true);
					}else{
						addButton.enable(false);
					}
				});
			},
			createGroup:function(e){
				if(this.groupName.replace(' ','') !== ''){
					this.modelData.add({group:this.groupName,id:wrn.makeId()});
					this.modelData.sync();
					this.set('groupName','');
					this.addButton.enable(false);
					$(e.target).closest('#addGroupView').find('input:text').focus();
					this.set('addedMessage',false);
				}
			},
			hide:function(){
				this.set('addedMessage',true);
			},
			afterShow:function(e){
				e.view.element.find('input:text').focus();
			},
			addedMessage:true,
			groupName:''
		})

	};

})(wrn); //pass in global namespace

