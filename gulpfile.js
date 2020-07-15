const gulp =require("gulp");
const cssmin =require("gulp-cssmin");
const autoprefixer=require("gulp-autoprefixer");
const sass =require("gulp-sass");
const uglify =require("gulp-uglify")
const babel =  require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const del =require("del");
const webServer =require("gulp-webserver")
const fileInclude=require("gulp-file-include")
const cssHander=()=>{
    return gulp
    .src("./src/css/*.css")
    .pipe(cssmin())
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/css"))
}

//打包sass文件
const sassHander=()=>{
    return gulp
    .src("./src/sass/*.scss")
    .pipe(sass())
    .pipe(cssmin())
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/sass"))
}

//打包js
const jsHandler =()=>{
    return  gulp 
    .src("./src/js/*.js")
                        //压缩之前，把es6转为Es5 ,
    .pipe(babel({
        presets:['@babel/env']
    }))                 
    .pipe(uglify())     //压缩js文件 gulp-uglify
    .pipe(gulp.dest("./dist/js"))
}
//components文件
const comHandler =()=>{
    return  gulp 
    .src("./src/components/*.html")
    //htmlmin第三方
     .pipe(htmlmin({
         collapseWhitespace:true,
         removeEmptyAttributes:true,
         removeAttributeQuotes:true,
         removeScriptTypeAttributes:true,
         removeStyleLinkTypeAttributes:true,
         minifyCSS:true,
         minifyJS:true
     }))
    .pipe(gulp.dest("./dist/components"))
}
//打包html文件
const htmlHandler =()=>{
    return  gulp 
    .src("./src/views/*.html")
    //htmlmin第三方
    .pipe(fileInclude({
        prefix:'@-@',
        basepath:'./src/components'
    }))
     .pipe(htmlmin({
         collapseWhitespace:true,
         removeEmptyAttributes:true,
         removeAttributeQuotes:true,
         removeScriptTypeAttributes:true,
         removeStyleLinkTypeAttributes:true,
         minifyCSS:true,
         minifyJS:true
     }))
    .pipe(gulp.dest("./dist/views"))
}

//5.移动第三方
const assetsHandler =()=>{
    return  gulp 
    .src("./src/assets/**")
   
    .pipe(gulp.dest("./dist/assets"))
}

const imgHandler =()=>{
    return  gulp 
    .src("./src/images/**")
   
    .pipe(gulp.dest("./dist/images"))
}
const videoHandler =()=>{
    return  gulp 
    .src("./src/videos/**")
   
    .pipe(gulp.dest("./dist/videos"))
}
const audioHandler =()=>{
    return  gulp 
    .src("./src/videos/**")
   
    .pipe(gulp.dest("./dist/audios"))
}

const serverHandler =()=>{
    return  gulp 
    .src("./src/server/*.php")
   
    .pipe(gulp.dest("./dist/server"))
}

//删除任务
const delHandler=()=>{
   return del(["./dist"])
}

//set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
const browserHandler =()=>{
    return gulp
      .src('./dist')
      .pipe(webServer({
          host:'localhost',
          port:8080, //端口号
          open:"views/index.html",
          livereload:true,
          proxies:[
            {
                source:'/gx',
                target:'http://localhost'
            },
          
        ]
      }))
}
//配置监控任务
const watchHander =()=>{
    gulp.watch("./src/css/*.css",cssHander);
    gulp.watch("./src/sass/*.scss",sassHander);
    gulp.watch("./src/images/**",imgHandler);
    gulp.watch("./src/views/*.html",htmlHandler);
    gulp.watch("./src/components/*.html",comHandler);
    gulp.watch("./src/js/*.js",jsHandler);
}

module.exports.default=gulp.series(
   delHandler,    //打包之前先删除任务
   gulp.parallel(comHandler,serverHandler,cssHander,sassHander,jsHandler,htmlHandler,assetsHandler,imgHandler,videoHandler,audioHandler), //执行任务
   browserHandler,      //浏览器在任务执行完成后自动打开
   watchHander        //监听文件的修改
   )