<template>
    <div class="box">
        <div class="sub_box1 subBox">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
          <div class="sub_box2 subBox">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
          <div class="sub_box3 subBox">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <p class="loadTitle">加载更多</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.loadTitle{
    width:100px;
    margin: 0 auto;
    margin-left:-60px;
    margin-top:40px;
     transform: rotateY(-180deg);
}
.box{
    width:25px;
    height:25px;
    position: fixed;
    left:50%;
    top:50%;
    margin:0 auto;
    transform: translate(-50%,-50%);
    transform: rotateY(180deg);
    /* display:none; */
}
.box .subBox{
    position: absolute;
    width:100%;
    height:100%;
}
.sub_box1 div,.sub_box2 div,.sub_box3 div{
    position: absolute;
width:5px;
height:5px;
border-radius: 50%;
background: black;
animation: load 1.2s infinite ease-in-out;
animation-fill-mode: both;
-webkit-animation:load 1.2s infinite ease-in-out reverse;
-webkit-animation-fill-mode: both;
}
.box .sub_box2{
    -webkit-transform: rotateZ(45deg);
   transform: rotateZ(45deg);
}
.box .sub_box3{
    -webkit-transform: rotateZ(90deg);
   transform: rotateZ(90deg);
}
.circle1{
    top:0;
    left:0;
}
.circle2{
    top:0;
    right:0;
}
.circle3{
    right:0;
    bottom:0;
}
.circle4{
    left:0;
    bottom:0;
}
@keyframes load {
    0%{
        transform: scale(0);
        -webkit-transform: scale(0);
    }50%{
        transform: scale(0.5);
        -webkit-transform: scale(0.5);
    }
    100%{
         transform: scale(1);
        -webkit-transform: scale(1);
    }
}
.sub_box2 .circle1{
    animation-delay:1.1s;
    -webkit-animation-delay:1.1s;
}
.sub_box3 .circle1{
    animation-delay:1s;
    -webkit-animation-delay:1s;
}
.sub_box1 .circle2{
    animation-delay:0.9s;
    -webkit-animation-delay:0.9s;
}
.sub_box2 .circle2{
    animation-delay:0.8s;
    -webkit-animation-delay:0.8s;
}
.sub_box3 .circle2{
    animation-delay:0.7s;
    -webkit-animation-delay:0.7s;
}
.sub_box1 .circle3{
    animation-delay:0.6s;
    -webkit-animation-delay:0.6s;
}
.sub_box2 .circle3{
    animation-delay:0.5s;
    -webkit-animation-delay:0.5s;
}
.sub_box3 .circle3{
    animation-delay:0.4s;
    -webkit-animation-delay:0.4s;
}
.sub_box1 .circle4{
    animation-delay:0.3s;
    -webkit-animation-delay:0.3s;
}
.sub_box2 .circle4{
    animation-delay:0.2s;
    -webkit-animation-delay:0.2s;
}
.sub_box3 .circle4{
    animation-delay:0.1s;
    -webkit-animation-delay:0.1s;
}
</style>