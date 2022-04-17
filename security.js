 /**
    *
    *  Secure Hash Algorithm (SHA256)
    *  http://www.webtoolkit.info/
    *
    *  Original code by Angel Marin, Paul Johnston.
    *
    **/
      
  function SHA256(s){
      
    var chrsz   = 8;
    var hexcase = 0;
  
    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
  
    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
  
    function core_sha256 (m, l) {
         
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 
            0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 
            0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 
            0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 
            0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 
            0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 
            0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 
            0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 
            0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 
            0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 
            0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
  
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
  
        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
  
            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
  
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
  
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
  
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }
  
    function str2binb (str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }
  
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    }
  
    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
            hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }
  
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
  
}
 
 

 ////// 패스워드 적용 //////
 

function pass_1() {
var key = document.getElementById('pw').value;
var encrypt = SHA256(key);


if( encrypt === "13b667faa591063701bea7f63cc1c601c7a693eb6c9bff6ea8b9a98aa17def3b" ) {
    alert("연주단 회원님 환영합니다.");
    // 연결 page url 난독화
    var _0x558339=_0x59c1;(function(_0x42ba88,_0x18d73b){var _0x43e8e1=_0x59c1,_0x6850bf=_0x42ba88();while(!![]){try{var _0x4dc24f=parseInt(_0x43e8e1(0xd5))/0x1*(-parseInt(_0x43e8e1(0xdc))/0x2)+-parseInt(_0x43e8e1(0xd7))/0x3+parseInt(_0x43e8e1(0xd2))/0x4+-parseInt(_0x43e8e1(0xd0))/0x5*(parseInt(_0x43e8e1(0xd8))/0x6)+-parseInt(_0x43e8e1(0xcf))/0x7*(parseInt(_0x43e8e1(0xda))/0x8)+parseInt(_0x43e8e1(0xd1))/0x9*(-parseInt(_0x43e8e1(0xdb))/0xa)+parseInt(_0x43e8e1(0xd6))/0xb*(parseInt(_0x43e8e1(0xdd))/0xc);if(_0x4dc24f===_0x18d73b)break;else _0x6850bf['push'](_0x6850bf['shift']());}catch(_0x201a9d){_0x6850bf['push'](_0x6850bf['shift']());}}}(_0x1068,0xc9a07),window[_0x558339(0xd4)][_0x558339(0xd3)]=_0x558339(0xd9));function _0x59c1(_0x543494,_0xb49dfa){var _0x1068d6=_0x1068();return _0x59c1=function(_0x59c1e9,_0x334c99){_0x59c1e9=_0x59c1e9-0xcf;var _0x8ff03f=_0x1068d6[_0x59c1e9];return _0x8ff03f;},_0x59c1(_0x543494,_0xb49dfa);}function _0x1068(){var _0x1392ec=['253QraKGQ','2418273ZHkdmv','12aqAqGo','information_debate.html','472TxwrPK','13547020AXtrpP','15628GaNnZV','1472916SxfLxM','35924ghlikC','149975KpxawR','9XXlrVy','2136636vopIBv','href','location','1dUexEh'];_0x1068=function(){return _0x1392ec;};return _0x1068();}
   
  } else{
    alert("인증에 실패하였습니다.");
    var pwremove = document.getElementById('pw');
    pwremove.value = null;    
  }


}



function pass_2() {
    var key = document.getElementById('pw').value;
    var encrypt = SHA256(key);

    
    if( encrypt === "7a2f9771b7d035fdd992cc8b4eec8fcc273235e187a6de2980fa2ae52dbc6d33" ) {
        alert("개발자님 환영합니다.");
        // 연결 page url 난독화
        function _0xb03c(_0x39905e,_0xb1c2f){var _0x4c8228=_0x4c82();return _0xb03c=function(_0xb03ca2,_0x1dc8ea){_0xb03ca2=_0xb03ca2-0x151;var _0x27b879=_0x4c8228[_0xb03ca2];return _0x27b879;},_0xb03c(_0x39905e,_0xb1c2f);}var _0x1e94f8=_0xb03c;(function(_0x1295f9,_0x5073f1){var _0x14b19a=_0xb03c,_0x2d4c3e=_0x1295f9();while(!![]){try{var _0x298f38=parseInt(_0x14b19a(0x151))/0x1*(-parseInt(_0x14b19a(0x159))/0x2)+parseInt(_0x14b19a(0x153))/0x3*(parseInt(_0x14b19a(0x15a))/0x4)+parseInt(_0x14b19a(0x158))/0x5*(parseInt(_0x14b19a(0x154))/0x6)+-parseInt(_0x14b19a(0x15e))/0x7+parseInt(_0x14b19a(0x152))/0x8*(-parseInt(_0x14b19a(0x156))/0x9)+-parseInt(_0x14b19a(0x15b))/0xa+-parseInt(_0x14b19a(0x157))/0xb*(-parseInt(_0x14b19a(0x15c))/0xc);if(_0x298f38===_0x5073f1)break;else _0x2d4c3e['push'](_0x2d4c3e['shift']());}catch(_0x1d3474){_0x2d4c3e['push'](_0x2d4c3e['shift']());}}}(_0x4c82,0xa45f7),window[_0x1e94f8(0x15d)][_0x1e94f8(0x155)]='information_debate.html');function _0x4c82(){var _0x46461f=['6883fqieWs','115928Hsfwci','3063819OzuHOF','834LYsOiQ','href','441zdLfPt','2200GalNke','26135vbcLPM','132XfmoYJ','4QHPbNH','8578870kBzoFO','94008DcAjee','location','4333917NsDhxf'];_0x4c82=function(){return _0x46461f;};return _0x4c82();}
       
      } else if(encrypt === "13b667faa591063701bea7f63cc1c601c7a693eb6c9bff6ea8b9a98aa17def3b") {
        alert("진정한 후렌치 후라이의 시대는 갔는가?")
        window.location.href="music.html"
      }
      
      
      else{
        alert("인증에 실패하였습니다.");
        var pwremove = document.getElementById('pw');
        pwremove.value = null;    
      } 
    
    
    }









