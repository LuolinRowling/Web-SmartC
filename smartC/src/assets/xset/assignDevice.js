/**
 * Created by admin on 2017/1/1.
 */

/**
 * Created by admin on 2016/12/30.
 */


//添加教室，分配设备
function addClassroomDevice() {
    var inputBuilding = $("#addBuilding option:selected").text();
    var inputClassroom = $("#addClassroom option:selected").text();
    console.log(inputBuilding+inputClassroom);
    var computerClassroom = $("#addComputerClassroom").val();
    var cameraClassroom = $("#addCameraClassroom").val();
    var projectorClassroom = $("#addProjectorClassroom").val();
    var raspberryClassroom = $("#addRaspberryClassroom").val();
    var singlechipClassroom = $("#addSinglechipClassroom").val();
    var raspberryCode = $("#addInputRaspberry").val();
    var data = {
        "buildingNum":inputBuilding,
        "classroomNum":inputClassroom,
        "computerTypeId":computerClassroom,
        "cameraTypeId":cameraClassroom,
        "projectorTypeId":projectorClassroom,
        "raspberryTypeId":raspberryClassroom,
        "singlechipTypeId":singlechipClassroom,
        "raspberryCode":raspberryCode
    }
    $.ajax({
        type: "POST",
        url: "/ajax_add_Classroom",
        dataType: "json",
        data: data,
        success: function(msg){
            console.log(msg.data);
            if(msg.data.judge == "0"){
                window.location.href = "assignDevice";
            }else if(msg.data.judge == "-9"){
                $(".classroom-wrong-tip").css("display","block");
            }else if(msg.data.judge == "-3"){
                $(".classroom-wrong-tip").css("display","block");
                $(".classroom-wrong-tip").text("该教室已分配设备！");
            }else{
                $(".classroom-wrong-tip").css("display","block");
                $(".classroom-wrong-tip").text("信息不能为空！");
            }
        }
    });
}

var deviceid;



//修改教室设备
function editClassroomDevice() {
    var inputBuilding = $("#editBuilding").val();
    var inputClassroom = $("#editClassroom").val();
    var computerClassroom = $("#editComputerClassroom").val();
    var cameraClassroom = $("#editCameraClassroom").val();
    var projectorClassroom = $("#editProjectorClassroom").val();
    var raspberryClassroom = $("#editRaspberryClassroom").val();
    var singlechipClassroom = $("#editSinglechipClassroom").val();
    var raspberryCode = $("#editInputRaspberry").val();
    var data = {
        "did":deviceid,
        "buildingNum":inputBuilding,
        "classroomNum":inputClassroom,
        "computerTypeId":computerClassroom,
        "cameraTypeId":cameraClassroom,
        "projectorTypeId":projectorClassroom,
        "raspberryTypeId":raspberryClassroom,
        "singlechipTypeId":singlechipClassroom,
        "raspberryCode":raspberryCode
    }
    $.ajax({
        type: "POST",
        url: "/ajax_edit_classroom",
        dataType: "json",
        data: data,
        success: function(msg){
            console.log(msg.data);
            if(msg.data.judge == "0"){
                window.location.href = "assignDevice";
            }else if(msg.data.judge == "-9"){
                $(".classroom-wrong-tip").css("display","block");
            }else{
                $(".classroom-wrong-tip").css("display","block");
                $(".classroom-wrong-tip").text("信息不能为空！");
            }
        }
    });
}

//获取用户点击要删除的id号
function getClassroomId(did){
    deviceid = did;
}

//删除教室
function deleteClassroom() {
    $.ajax({
        type: "POST",
        url: "/ajax_delete_classroom",
        dataType: "json",
        data: {
            "did":deviceid
        },
        success: function(msg){
            console.log(msg.data);
            if(msg.data.judge == "0"){
                window.location.href = "assignDevice";
            }else if(msg.data.judge == "-1"){
                $(".delete-wrong-tip").css("display","block");
            }else if(msg.data.judge == "-9"){
                $(".delete-wrong-tip").css("display","block");
                $(".delete-wrong-tip").text("删除失败！")
            }
        }
    });
}

$(document).ready(function(){
    $('#addBuilding').change(function(){
        var bid=$(this).children('option:selected').val();
        console.log(bid);
        changeClassroomByBuilding(bid);
    });
});
function changeClassroomByBuilding(bid){
    $.ajax({
        type: "POST",
        url: "/ajax_change_building",
        dataType: "json",
        data: {
            "bid":bid
        },
        success: function(msg){
            console.log(msg.data.classroomlist);
            $('#addClassroom').html("");
            var classroomlist = msg.data.classroomlist;
            for(var i=0;i<classroomlist.length;i++){
                $('#addClassroom').append('<option value="'+classroomlist[i]['id']+'">'+classroomlist[i]['classroomNum']+'</option>');
            }
        }
    });
}

//添加摄像头
var MaxInputs = 2;
var InputsWrapper = $('#inputCameraWrapper');
var x = InputsWrapper.length;
var FieldCount=1;

$('#addCameraBtn').click(function(){
    console.log("x");
    if(x <= MaxInputs) //max input box allowed
    {
        FieldCount++; //text box added increment
        //add input box
        // $(InputsWrapper).append('<div><input type="text" name="mytext[]" id="field_'+ FieldCount +'" value="Text '+ FieldCount +'"/><a href="#" class="removeclass">×</a></div>');
        //$(InputsWrapper).append('<div class="form-group"><label for="inputClassroom" class="col-sm-2 control-label">教室号</label><span class="glyphicon glyphicon-remove removeclass" aria-hidden="true"></span><div class="col-sm-4"><input type="text" class="form-control inputClassroom" id="inputClassroom_'+FieldCount+'" placeholder="教室号"></div></div>');
        $(InputsWrapper).append('<div class="form-group">'+
            '<label class="col-sm-2 control-label">摄像头型号</label>'+
            '<div class="col-sm-3">'+
                '<select class="form-control" id="addCameraClassroom">'+
                    "<option value='ID'>型号1</option>"+
                '</select>'+
            '</div>'+
            '<label class="col-sm-1 control-label">名称</label>'+
            '<span class="glyphicon glyphicon-remove removeclass cursor-hand" aria-hidden="true" id="addCameraBtn"></span>'+
            '<div class="col-sm-3">'+
                '<input type="text" class="form-control" id="addCameraAngleClassroom" placeholder="如：全景、正面、侧面">'+
            '</div>'+
            '</div>');

        x++; //text box increment
    }
    return false;
})

$("body").on("click",".removeclass", function(e){ //user click on remove text
    if( x > 1 ) {
        $(this).parent('div').remove(); //remove text box
        x--; //decrement textbox
    }
    return false;
});


