(function(wrn){

	'use strict';

	//below you place anything private you don't want exposed in the viewModel

	//below we create the viewModel
 
	wrn.groupList = {//create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
		viewModel: kendo.observable({
			//the actual model
			modelData: wrn.groupModel,
			//other properties or functions you want to observe and expose to html
			init:function(e){
				e.view.element.on('blur','input:text',(function(e){
					var input = $(e.target);
					var id = input.data('id');
					this.modelData.get(id).set('group',input.val());
					this.modelData.sync();
				}).bind(this));//change this
			},
			afterShow:function(){
				var total = this.modelData.total();
				if(total === 0){
					this.set('noGroups',false);
					this.set('hasGroups',true);
				}else{
					this.set('noGroups',true);
					this.set('hasGroups',false);
				}
			},
			forceNoneEditModeIfNeeded:function(){
				if(this.isEditMode === true){
					this.set('editButtonText', 'edit');
					this.set('isEditMode',false);
					this.set('notEditMode',true);
				}
			},
			viewGroup:function(e){
				if(this.isEditMode === true){return false;}
				//navigate
				var id = $(e.touch.target).data('id');
				wrn.app.navigate('#viewerView?id='+id);
			},
			removeGroup:function(e){
				var id = $(e.target).closest('li').data('id');
				//remove
				this.modelData.remove(this.modelData.get(id));//remove from groupModel
				wrn.viewerModel.remove(wrn.viewerModel.get(id));//remove from viewerModel
				//sync, so destroy prop is added
				this.modelData.sync();
				wrn.viewerModel.sync();
				//remove destoryed
				wrn.removeDestroyed('groupModel');
				wrn.removeDestroyed('viewerModel');
				this.afterShow();
			},
			editMode: function(){
				if(this.isEditMode === false){//go into edit mode
					this.set('editButtonText', 'done');
					this.set('isEditMode',true);
					this.set('notEditMode',false);
				}else{//stop edit mode
					this.set('editButtonText', 'edit');
					this.set('isEditMode',false);
					this.set('notEditMode',true);
				}
			},
			editButtonText:'edit',
			noGroups:true,
			hasGroups:true,
			isEditMode:false,
			notEditMode:true
		})
	};

})(wrn); //pass in global namespace

