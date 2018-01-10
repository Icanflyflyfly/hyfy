/**
 * Created by jacobllpjacobllp on 2017/9/26.
 */
Ext.namespace('com.bhtec.view.business.seal.sealapply');
com.bhtec.view.business.seal.sealapply.Certificate = function(config){
    var moduleVOp = this;   //父类调用
    var isChecked = true;
    var addText = true;
    var setState = true;
    var scanArray = [];
    var photoArray = [];

    /**
     * 获得当前日期
     * @returns {string}
     * @constructor
     */
    var GetTimeString = function (){
        var date = new Date();
        var yy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();
        var hh = date.getHours().toString();
        var nn = date.getMinutes().toString();
        var ss = date.getSeconds().toString();
        var mi = date.getMilliseconds().toString();

        var ret = yy + mm + dd + hh + nn + ss + mi;
        return ret;
    }
    /**
    * 扫描 拍照
    * */
    var scanPic = function(flag){
        if(flag == 0 || flag == 2){
            if (basicConstant.VideoMain){
                var view1 = document.getElementById('view1');
                var thumb1 = document.getElementById('thumb_1');
                var imgList = view1.Video_CreateImageList(basicConstant.VideoMain, 0, 0);
                if (imgList) {
                    var len = view1.ImageList_GetCount(imgList);
                    for (var i = 0; i < len; i++) {
                        var img = view1.ImageList_GetImage(imgList, i);
                        var Name = "D:\\" + GetTimeString() + ".jpg";
                        var b = view1.Image_Save(img, Name, 0);
                        if (b) {
                            view1.View_PlayCaptureEffect();
                            thumb1.Thumbnail_Add(Name);
                            //本地图片
                            scanArray.push(Name);
                        }

                        view1.Image_Release(img);
                    }

                    view1.ImageList_Release(imgList);
                }
            }
        }
        if(flag == 1 || flag == 2){
            var view2 = document.getElementById('view2');
            var thumb2 = document.getElementById('thumb_2');
            if (basicConstant.VideoAssist){
                var imgList2 = view2.Video_CreateImageList(basicConstant.VideoAssist, 0, 0);
                if (imgList2) {
                    var len = view2.ImageList_GetCount(imgList2);
                    for (var i = 0; i < len; i++) {
                        var img = view2.ImageList_GetImage(imgList2, i);
                        var Name = "D:\\" + GetTimeString() + ".jpg";
                        var b = view2.Image_Save(img, Name, 0);
                        if (b) {
                            view2.View_PlayCaptureEffect();
                            thumb2.Thumbnail_Add(Name);
                            //本地图片
                            photoArray.push(Name);
                        }
                        view2.Image_Release(img);
                    }

                    view2.ImageList_Release(imgList2);
                }
            }
        }
    }



    var EnableDate = function (isChecked){
        var view1 = document.getElementById('view2');

        if (isChecked){
            var offsetx = 60;
            var offsety = 60;

            var font;
            font = view1.Global_CreateTypeface(50, 50, 0, 0, 2, 0, 0, 0, "宋体");
            if (basicConstant.VideoMain){
                var width = view1.Video_GetWidth(basicConstant.VideoMain);
                var heigth = view1.Video_GetHeight(basicConstant.VideoMain);
                view1.Video_EnableDate(basicConstant.VideoMain, font, width/2, (heigth/2)+300, 0xffffff, 0);
            }
            if (basicConstant.VideoAssist){
                var width = view1.Video_GetWidth(basicConstant.VideoAssist);
                var heigth = view1.Video_GetHeight(basicConstant.VideoAssist);

                view1.Video_EnableDate(basicConstant.VideoAssist, font, width/2, (heigth/2), 0xffffff, 0);
            }
            view1.Font_Release(font);
        }else{
            if(basicConstant.VideoMain){
                view1.Video_DisableDate(basicConstant.VideoMain);
            }
            if(basicConstant.VideoAssist){
                view1.Video_DisableDate(basicConstant.VideoAssist);
            }
        }
    }

    var AddText = function (isChecked){
        var view1 = document.getElementById('view2');
        if (isChecked){
            var font;
            font = view1.Global_CreateTypeface(200, 200, 0, 0, 2, 0, 0, 0, "宋体");

            if (basicConstant.VideoMain){
                view1.Video_EnableAddText(basicConstant.VideoMain, font, 0, 0, basicConstant.TEXT_SEAL, 65280, 150);
            }
            if (basicConstant.VideoAssist){
                view1.Video_EnableAddText(basicConstant.VideoAssist, font, 0, 0, basicConstant.TEXT_SEAL, 65280, 150);
            }
            view1.Font_Release(font);
        }
        else{
            if(basicConstant.VideoMain){
                view1.Video_DisableAddText(basicConstant.VideoMain);
            }
            if(basicConstant.VideoAssist){
                view1.Video_DisableAddText(basicConstant.VideoAssist);
            }
        }
    }

    var SetState = function (isChecked){
        var view1 = document.getElementById('view1');
        if (isChecked){
            view1.View_SetState(2);
            // document.getElementById('scansize').disabled="disabled";
        }else{
            view1.View_SetState(1);
            // document.getElementById('scansize').disabled="";
        }
    }

    var Left = function (){
        var view1 = document.getElementById('view1');
        if(basicConstant.VideoMain){
            view1.Video_RotateLeft(basicConstant.VideoMain);
        }
        if(basicConstant.VideoAssist){
            view1.Video_RotateLeft(basicConstant.VideoAssist);
        }

    }

    var Right = function (){
        var view1 = document.getElementById('view1');
        if(basicConstant.VideoMain)
        {
            view1.Video_RotateRight(basicConstant.VideoMain);
        }
        if(basicConstant.VideoAssist){
            view1.Video_RotateRight(basicConstant.VideoAssist);
        }

    }

    moduleVOp.window({
        id:"scanWinId",
        title: '申刻材料扫描',
        width : window.screen.width*0.7,
        height: window.screen.height  * 0.6,
        buttonAlign:'right',
        style:'background-color:#FFF',
        buttons:[{
            xtype : 'button',
            id : "leftButton",
            iconCls : 'table_save',
            text : '左转',
            handler : function(thiz){
                Left();
            }
        },{
            xtype : 'button',
            id : "rightButton",
            iconCls : 'table_save',
            text : '右转',
            handler : function(thiz){
                Right();
            }
        },{
            xtype : 'button',
            id : "enableDateButton",
            iconCls : 'table_save',
            text : '日期开',
            handler : function(thiz){
                EnableDate(isChecked);
                isChecked = !isChecked;
                if(isChecked){
                    thiz.setText('日期开');
                }else{
                    thiz.setText('日期关');
                }
            }
        },{
            xtype : 'button',
            id : "addTextButton",
            iconCls : 'table_save',
            text : '水印开',
            handler : function(thiz){
                AddText(addText);
                addText = !addText;
                if(addText){
                    thiz.setText('水印开');
                }else{
                    thiz.setText('水印关');
                }
            }
        },{
            xtype : 'button',
            id : "setStateButton",
            iconCls : 'table_save',
            text : '手选开',
            handler : function(thiz){
                SetState(setState);
                setState = !setState;
                if(setState){
                    thiz.setText('手选开');
                }else{
                    thiz.setText('手选关');
                }
            }
        },{
            xtype : 'button',
            id : "scanAvatarButton",
            iconCls : 'table_save',
            text : '扫描&头像',
            style:'margin-left:20px',
            handler : function(){
                scanPic(2);
            }
        },{
            xtype : 'button',
            id : "scanButton",
            iconCls : 'table_save',
            text : '扫描',
            handler : function(){
                scanPic(0);
            }
        },{
            xtype : 'button',
            id : "avatarButton",
            iconCls : 'table_save',
            text : '头像',
            handler : function(){
                scanPic(1);
            }
        },{
            xtype : 'button',
            id : "delScanButton",
            iconCls : 'table_save',
            text : '清除扫描',
            style:'margin-left:20px',
            handler : function(){
                var thumb_1 = document.getElementById('thumb_1');
                thumb_1.Thumbnail_Clear(true);
                scanArray.splice(0,scanArray.length);
            }
        },{
            xtype : 'button',
            id : "delPhotoButton",
            iconCls : 'table_save',
            text : '清除人像',
            handler : function(){
                var thumb_2 = document.getElementById('thumb_2');
                thumb_2.Thumbnail_Clear(true);
                photoArray.splice(0,photoArray.length);
            }
        },{
            xtype : 'button',
            id : "closeButtonScan",
            iconCls : 'table_close',
            text : '确定',
            handler : function(){
                 // alert(JSON.stringify(scanArray));
                 // alert(JSON.stringify(photoArray));

                var applyImagesId = document.getElementById('applyImagesId');
                for(var i=0;i<scanArray.length;i++){
                    applyImagesId.Thumbnail_Add(scanArray[i]);
                }

                for(var i=0;i<photoArray.length;i++){
                    applyImagesId.Thumbnail_Add(photoArray[i]);
                }

                if (basicConstant.VideoMain){
                    var view1 = document.getElementById('view1');
                    var imgList = view1.Video_CreateImageList(basicConstant.VideoMain, 0, 0);
                    if (imgList) {
                        var len = view1.ImageList_GetCount(imgList);
                        for (var i = 0; i < len; i++) {
                            var img = view1.ImageList_GetImage(imgList, i);
                            var imgBase64 = view1.Image_GetBase64(img, 2, 0);
                            getExtCmpById('s' + i).setValue(imgBase64);
                            console.log(imgBase64);
                            view1.Image_Release(img);
                        }

                        view1.ImageList_Release(imgList);
                    }
                }

                if(basicConstant.VideoAssist) {
                    var view2 = document.getElementById('view2');
                    var imgList2 = view2.Video_CreateImageList(basicConstant.VideoAssist, 0, 0);
                    if (imgList2) {
                        var len = view2.ImageList_GetCount(imgList2);
                        for (var i = 0; i < len; i++) {
                            var img = view2.ImageList_GetImage(imgList2, i);
                            var imgBase64 = view2.Image_GetBase64(img, 2, 0);
                            getExtCmpById('p' + i).setValue(imgBase64);
                            view2.Image_Release(img);
                        }

                        view2.ImageList_Release(imgList2);
                    }
                }

                getExtCmpById('scanWinId').close();

            }
        }],
        items: moduleVOp.panel({
            style:{

            },
            html:
            '<div style="text-align: center;width: 98%;margin:0 auto;padding:0 auto;display:inline;">'+
            '<div style="float:left;text-align: center;font-size:16px;color:#cc3300;font-weight:bold;width: 47%;margin: 10px;">审刻材料扫描</div>'+
            '<div style="float:left;text-align: center;font-size:16px;color:#cc3300;font-weight:bold;width: 47%;margin: 10px;">审刻人像采集</div>'+
            '</div>'+

            '<div style="text-align: center;margin:0 auto;padding:0 auto;">'+
                '<object style="width: 45%;margin: 10px 3px;" id="view1" type="application/x-eloamplugin" width="600" height="300" name="view"></object>'+
                '<object style="width: 48%;margin: 10px 3px;" id="view2" type="application/x-eloamplugin" width="600" height="300" name="view"></object>'+
            '</div>'+

            ' <div style="text-align: center;width: 98%;margin:0 auto;padding:0 auto;">'+
                '<object id="thumb_1" style="float:left;width: 47%;margin: 10px;z-index:9999;" type="application/x-eloamplugin" height="150" name="thumb"></object>'+
                '<object id="thumb_2" style="float:left;width: 47%;margin: 10px;z-index:9999;" type="application/x-eloamplugin" height="150" name="thumb"></object>'+
            '</div>',
            listeners :{
                afterrender:function(){

                    /**主头**/
                    var view1 = document.getElementById('view1');
                    var deviceType = view1.Global_GetEloamType(1, 0);
                    // alert('deviceType = '+deviceType);
                    if(basicConstant.DeviceMain == null){
                        basicConstant.DeviceMain = view1.Global_CreateDevice(1, 0);
                        // alert('basicConstant.DeviceMain = '+basicConstant.DeviceMain);
                    }

                    if (basicConstant.VideoMain == null){
                        basicConstant.VideoMain = view1.Device_CreateVideo(basicConstant.DeviceMain, 5, 2);
                        // alert('basicConstant.VideoMain = '+basicConstant.VideoMain);
                    }

                    if (basicConstant.VideoMain){
                        // alert("打开视频中，请等待...");
                        var res = view1.View_SelectVideo(basicConstant.VideoMain);
                        // alert("res = "+res);
                        view1.View_SetText("打开视频中，请等待...", 0);
                    }

                    /**副头**/
                    var view2 = document.getElementById('view2');

                    if(basicConstant.DeviceAssist == null){
                        basicConstant.DeviceAssist = view2.Global_CreateDevice(1, 1);
                    }

                    if (basicConstant.VideoAssist == null){
                        basicConstant.VideoAssist = view2.Device_CreateVideo(basicConstant.DeviceAssist, 0, 0);
                    }

                    if (basicConstant.VideoAssist){
                        view2.View_SelectVideo(basicConstant.VideoAssist);
                        view2.View_SetText("打开视频中，请等待...", 0);
                    }

                },
                beforedestroy:function(){
                    /**主头**/
                    var view1 = document.getElementById('view1');
                    if (basicConstant.VideoMain){
                        view1.Video_Release(basicConstant.VideoMain);
                        basicConstant.VideoMain = null;
                    }
                    if(basicConstant.DeviceMain){
                        view1.Device_Release(basicConstant.DeviceMain);
                        basicConstant.DeviceMain = null;
                    }
                    /**副头**/
                    var view2 = document.getElementById('view2');
                    if (basicConstant.VideoAssist){
                        // AssistView().View_SetText("", 0);
                        view2.Video_Release(basicConstant.VideoAssist);
                        basicConstant.VideoAssist = null;
                    }
                    if(basicConstant.DeviceAssist){
                        view2.Device_Release(basicConstant.DeviceAssist);
                        basicConstant.DeviceAssist = null;
                    }

                }

            }
        })
    })


}

Ext.extend(com.bhtec.view.business.seal.sealapply.Certificate, com.bhtec.view.util.CommonWidgets, {});