$(function(){
    var $file = $('#file');
    var $ok = $('#clipBtn');
    $ok.click(function(){
        $('.myClip').removeClass('active')
    });
    $file.attr("accept", "image/*");
    $file.change(function(){
        console.log(1);
        $('.myClip').addClass('active');

    });
    var $shang = $('.shang');
    $shang.click(function(){
        $file.click();
    });



});
function fileSize(str)
{
   var fileSize;
   if(str.indexOf('=')>0)
   {
       var indexOf=str.indexOf('=');
       str=str.substring(0,indexOf);//把末尾的’=‘号去掉
   }

   fileSize=parseInt(str.length-(str.length/8)*2);
   return fileSize;
};


function putb64(pic) {
    // console.log(pic);
    $.ajax({
        dataType : 'json',//返回json
        type: 'post',
        url: "...",//获取token
        success: function (data) {
            var token = data.uptoken;
            // 把字符串转换成json
            function strToJson(str) {
                var json = eval('(' + str + ')');
                return json;
            }

            var url = "https://upload-z2.qiniu.com/putb64/"+fileSize(pic) +  "/key/" + base64encode("随机文件名.jpg");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var keyText = xhr.responseText;
                    // 返回的key是字符串，需要装换成json
                    keyText = strToJson(keyText);
                    //keyText.key 是返回的图片文件名
                    var key = keyText.key;
                    console.log(key);
                    // var getToken = $('.token').val();
                    // $.ajax({
                    //     type: 'post',
                    //     url: "http://test.dankal.cn/wansj/public/index.php/api/Index/getShareUrl",
                    //     data:{
                    //         // token:getToken,
                    //         file_key:key,
                    //     },
                    //     success: function (data) {
                    //         var shareUrl = data.share_url;
                    //         console.log(shareUrl);
                    //     },
                    //     error: function () {
                    //         console.log("上传base64至七牛失败");
                    //     }
                    // })
                }
            }
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", "UpToken " + token);
            xhr.send(pic);
        },
        error: function () {
            console.log("sendFile请求出错");
            // $('.loading').html("亲，真抱歉，图片上传失败");
        }
    })
}

// raymond
// function putb64_2(pic){
//     $.ajax({
//         dataType : 'json',
//         type: 'post',
//         url: ".......",

//         success: function (data) {
//             var token = data.uptoken;
//             //console.log(token);
//             // 把字符串转换成json
//             function strToJson(str) {
//                 var json = eval('(' + str + ')');
//                 return json;
//             }
//             var f_size = fileSize(pic);
//             var url = "http://upload-z2.qiniu.com/putb64/" + f_size + "/key/" + base64encode("随机文件名.jpg");
//             var xhr = new XMLHttpRequest();
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState == 4) {
//                     var keyText = xhr.responseText;
//                     console.log("keyText = " + keyText);
//                 }
//             }
//             xhr.open("POST", url, true);
//             xhr.setRequestHeader("Content-Type", "application/octet-stream");
//             xhr.setRequestHeader("Authorization", "UpToken " + token);
//             xhr.send(pic);
//         },
//         error: function () {
//             console.log("sendFile请求出错");
//             $('.loading').html("亲，真抱歉，图片上传失败");
//         }
//     });
// }