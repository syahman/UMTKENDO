(function(wrn){

	  'use strict';

	  //below you place anything private you don't want exposed in the viewModel

	  //below we create the viewModel 
	  wrn.addName = { //create viewModel namespace in global i.e. namespace.[viewModel Name], to expose to global
			viewModel: kendo.observable({
				//the actual model
				modelData: wrn.viewerModel,
				//other properties or functions you want to observe and expose to html
				init:function(){
					this.addButton = $('#addNamePhotoBtn').data('kendoMobileButton');
					var addButton = this.addButton;
					var photoInput = $('#photoInput');
					var photoNameInput = $('#photoNameInput');

					$('#photoInput,#photoNameInput').on('change input',function(){
						setTimeout(function(){
							if(photoInput.val().replace(' ','') !== '' && photoNameInput.val().replace(' ','') !== ''){
								addButton.enable(true);
							}else{
								addButton.enable(false);
							}
						},100);
					});
				},
				show:function(e){
					this.currentId = Number(e.view.params.id);
					e.view.element.find('input:text').focus();
				},
				hide:function(){
					this.set('addedMessage',true);
				},
				addPhoto:function(e){
					var elm = e;
					var fileInput = $(e.target).closest('#addNameView').find('input:file');
					if(fileInput.val() === '' || this.name.replace(' ','') === ''){return false;}
					wrn.app.pane.loader.show();
					var id = this.currentId;
					var that = this;

					canvasResize(fileInput[0].files[0], {
						width: 320,
						height: 320,
						crop: true,
						quality: 99,
						//rotate: 90,
						callback: function(data) {
							if(that.modelData.get(id)){//update
								var imgAndName = that.modelData.get(id).imagesAndName;
								imgAndName.push({
									  image:data,
									  id:wrn.makeId(),
									  name:that.name,
								});
								that.modelData.sync();
							}else{//add
								that.modelData.add({
									  id:id,
									  imagesAndName:[{
											image:data,
											id:wrn.makeId(),
											name:that.name,
									  }]
								});
								that.modelData.sync();
							}
							//reset form
							that.set('name','');
							$(elm.target).closest('#addNameView').find('form')[0].reset();
							wrn.app.pane.loader.hide();
							that.set('addedMessage',false);
							that.addButton.enable(false);
						}
					});

					/*WITH OUT RESIZE
					var reader = new FileReader();
					reader.onload = (function(e){

						  if(this.modelData.get(id)){//update
								var imgAndName = this.modelData.get(id).imagesAndName;
								imgAndName.push({
									  image:e.target.result,
									  id:wrn.makeId(),
									  name:this.name,
								});
								this.modelData.sync();
						  }else{//add
								this.modelData.add({
									  id:id,
									  imagesAndName:[{
											image:e.target.result,
											id:wrn.makeId(),
											name:this.name,
									  }]
								});
								this.modelData.sync();
						  }
						  //reset form
						  this.set('name','');
						  $(elm.target).closest('#addNameView').find('form')[0].reset();




					}).bind(this);//change this
					//reader, read file as data URL
					reader.readAsDataURL(fileInput[0].files[0]);
					*/
				},
				addedMessage:true,
				viewPhotos:function(){
					wrn.app.navigate('#viewerView?id='+this.currentId);
				},
				name:'',
				currentId:0
			})
	  };
})(wrn); //pass in global namespace