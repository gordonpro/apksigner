/**
 * Created by willgordon on 15/6/17.
 */

var fs = require("fs")
var path = require("path")
var os = require("os")
var child_process = require("child_process")

var jsonFileName = "ad12834789a9x8791928z.mak1dljl11aj31"

function writeProfileToJson(profileJsonData, callback) {
    var jsonPath = path.join(os.tmpdir(), jsonFileName)
    fs.writeFile(jsonPath, profileJsonData, function (err) {
        if (err){
            callback(err)
        }else{
            console.log('Profile saved to ' + jsonPath);
            callback()
        }
    });
}

function loadProfile(callback) {
    var jsonPath = path.join(os.tmpdir(), jsonFileName)
    if(fs.existsSync(jsonPath)){
        fs.readFile(jsonPath, function (err, data) {
            if (err) throw err;
            callback(data.toString("utf-8"))
        });
    }else{
        callback(null)
    }
}


/*
 jarsigner -verbose -sigalg MD5withRSA -digestalg SHA1 -keystore my-release-key.keystore my_application.apk alias_name
 jarsigner -verbose -sigalg MD5withRSA -digestalg SHA1 -keystore my-release-key.keystore  -storepass *yourpass* -keypass *yourpass* my_application.apk  alias_name
 */

/*
 jarsigner -digestalg SHA1 -sigalg MD5withRSA -verbose -keystore [your_key_store_path] -signedjar [signed_apk_name] [usigned_apk_name] [your_key_store_alias]
 */
function signApkWithPassword(be_sign_apk_path, sign_to_apk_path, key_store_path, key_store_alias, password) {
    child_process.spawn("jarsigner",
        ["-digestalg", "SHA1", "-sigalg", "MD5withRSA", "-verbose", "-keystore", key_store_path, "-storepass", password, "-keypass", password, "-signedjar", sign_to_apk_path, be_sign_apk_path, key_store_alias],
        {
            stdio: [
                process.stdin,
                process.stdout,
                process.stderr,
            ]
        })
}

function signApk(be_sign_apk_path, sign_to_apk_path, key_store_path, key_store_alias, password) {
    child_process.spawn("jarsigner",
        ["-digestalg", "SHA1", "-sigalg", "MD5withRSA",
            "-verbose", "-keystore", key_store_path, "-signedjar",
            sign_to_apk_path, be_sign_apk_path, key_store_alias],
        {
            stdio: [
                process.stdin,
                process.stdout,
                process.stderr,
            ]
        })
}

function setStdoutOnData(callback) {
    //process.stdout.on('data', callback);
    //process.stdout.on('data', function (data) {
    //    console.log(data);
    //    console.log("fuckkkk")
    //});
}


module.exports.writeProfileToJson = writeProfileToJson;
module.exports.loadProfile = loadProfile;
module.exports.setStdoutOnData = setStdoutOnData;
module.exports.signApkWithPassword = signApkWithPassword;