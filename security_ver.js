pwd = prompt ('인증 코드');
if(pwd == 5521) {
   
} 

else if(pwd === '') {
    window.location.href="music.html";
}


else {
    alert('비밀번호를 확인해주세요')
   window.location.href="index.html"; // 해당 페이지로 이동
   //window.history.go(-1); //전페이지 이동
}