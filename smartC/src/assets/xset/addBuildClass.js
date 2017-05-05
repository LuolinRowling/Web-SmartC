var MaxInputs = 9;
var InputsWrapper = $('#inputWrapper');
var x = InputsWrapper.length;
var FieldCount=1;

$('#addInputBtn').click(function(){
    if(x <= MaxInputs) //max input box allowed
    {
        FieldCount++; //text box added increment
        //add input box
        // $(InputsWrapper).append('<div><input type="text" name="mytext[]" id="field_'+ FieldCount +'" value="Text '+ FieldCount +'"/><a href="#" class="removeclass">×</a></div>');
        $(InputsWrapper).append('<div class="form-group"><label for="inputClassroom" class="col-sm-2 control-label">教室号</label><span class="glyphicon glyphicon-remove removeclass" aria-hidden="true"></span><div class="col-sm-4"><input type="text" class="form-control inputClassroom" id="inputClassroom_'+FieldCount+'" placeholder="教室号"></div></div>');
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

$('#addBuildClass').click(function(){
    var buildingNum = $('#inputBuilding').val();
    var classroomNums = [];
    $('.inputClassroom').each(function(i, obj){
        classroomNums.push($(this).val());
    });
    console.log(classroomNums);
    console.log(buildingNum);
})
