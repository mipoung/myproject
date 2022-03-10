

       

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(); 

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.40960506201756, 126.67865875458125), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

//
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
// var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
// var zoomControl = new kakao.maps.ZoomControl();
// map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
//

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    //var places = new kakao.maps.services.Places();
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB,{
    radius : 10000,
    location: new kakao.maps.LatLng(37.39787605239137, 126.6562262064169)

    
    
}); 
   
   
   // function MoveFocus(next) {
       // if(keycode == 13){
         //   document.getElementById(map).focus();
      //  }
   // }
}




// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        map.setLevel(3); // 검색 후 맵 레벨을 변경합니다.
    } 
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="width:100%; padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}


// 클릭하면 주소 나오게 하기

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();


    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    infowindow = new kakao.maps.InfoWindow ({
        zindex:1,
        removable : true
    
        
    }); 


// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div style="width:100%; padding:2px;">도로명: ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div style="width:100%; padding:2px;">지번: ' + result[0].address.address_name + '</div>';
 
            var content = '<div class="bAddr">' +
                            '<span class="title">법정동 주소정보</span>' + 
                            detailAddr + 
                        '</div>';

            // 마커를 클릭한 위치에 표시합니다 
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }   
    });
});




function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}






// 폴리라인 배열 데이터
    // 어린이 보호구역
    // 1.레인보우 유치원
    var child = [
    {
        path: [new kakao.maps.LatLng(37.3976233826105, 126.63505204019253), new kakao.maps.LatLng(37.39530029412674, 126.63848512925334)],

        color: 'orange'
    },


    // 2.송일초등학교
    {
        path: [new kakao.maps.LatLng(37.385995608319455, 126.63355014358906), new kakao.maps.LatLng(37.38375316147891, 126.63682427696257)],

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38433264495929, 126.63774738574803), new kakao.maps.LatLng(37.382904272555635, 126.63619605858467)],

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38587804248402, 126.63632848348081), new kakao.maps.LatLng(37.3833647778794, 126.6335968205853), new kakao.maps.LatLng(37.38233319489985, 126.63508098796346)],

        color: 'orange'
    }

    // 3.예송초등학교
    ,{
        path: [new kakao.maps.LatLng(37.38601820342405, 126.63357261714151), new kakao.maps.LatLng(37.38867304168909, 126.62966390239085)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38582685715904, 126.6299940699229), new kakao.maps.LatLng(37.38716336771038, 126.62807916599785)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38932758511248, 126.63152390471829), new kakao.maps.LatLng(37.38546731112801, 126.6273987514651)], 

        color: 'orange'
    },

    // 4. 예송유치원
    {
        path: [new kakao.maps.LatLng(37.38416274245866, 126.63160281436076), new kakao.maps.LatLng(37.38171258124005, 126.62891622477832)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38331275139708, 126.63352650277173), new kakao.maps.LatLng(37.38158597266287, 126.63164929328664)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.383514130775275, 126.62876055912204), new kakao.maps.LatLng(37.38067084380284, 126.6329070655553)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38249262303242, 126.62769292826887), new kakao.maps.LatLng(37.37982999579218, 126.63197402513356)], 

        color: 'orange'
    },



    // 5. 해송초등학교

    {
        path: [new kakao.maps.LatLng(37.382450084403466, 126.64762779729092), new kakao.maps.LatLng(37.37958987174687, 126.65237202546301)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.37970302792544, 126.64722571302194), new kakao.maps.LatLng(37.37844772897309, 126.6492864872651)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.378374531630236, 126.645888352164), new kakao.maps.LatLng(37.38160055191215, 126.64903469175256)], 

        color: 'orange'
    },


    // 6. 송명초, 첨단초
    {
        path: [new kakao.maps.LatLng(37.37801083122453, 126.6569999775748), new kakao.maps.LatLng(37.37195750044028, 126.65136013224875)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.37469152935075, 126.66202788341695), new kakao.maps.LatLng(37.36874655534533, 126.65638738550648)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.374541615375485, 126.65380940219931), new kakao.maps.LatLng(37.371457099982756, 126.65897162719509)], 

        color: 'orange'
    },


    // 7. 송도 꿈 유치원
    {
        path: [new kakao.maps.LatLng(37.371436884227194, 126.65899147547512), new kakao.maps.LatLng(37.36917469617186, 126.66270176416648)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.37105167580327, 126.66133579537245), new kakao.maps.LatLng(37.370123484371376, 126.6628640348751)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.370403601725194, 126.66314501706586), new kakao.maps.LatLng(37.36946392697664, 126.66222914156977)], 

        color: 'orange'
    },


    // 8. 송원초등학교
    {
        path: [new kakao.maps.LatLng(37.388446547753574, 126.66712665206087), new kakao.maps.LatLng(37.385980097401124, 126.6647662857969)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.387155052589456, 126.66925524678823), new kakao.maps.LatLng(37.3836860086601, 126.66600726374172)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38844661132298, 126.6671492360482), new kakao.maps.LatLng(37.386464680582854, 126.67047779787042), new kakao.maps.LatLng(37.38600283346716, 126.67288496589987)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.3867306307455, 126.66891835483925), new kakao.maps.LatLng(37.384569166732, 126.67250728124169)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38609963014598, 126.67204895337458), new kakao.maps.LatLng(37.38532266217857, 126.67129579571004)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38693793076861, 126.66573877120092), new kakao.maps.LatLng(37.3856779637468, 126.66785591601791)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38629184103293, 126.66508106852625), new kakao.maps.LatLng(37.38502292319253, 126.6672151830534)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38594857812252, 126.66477207200681), new kakao.maps.LatLng(37.38464345048468, 126.66684423852632)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38402008312534, 126.66625419432833), new kakao.maps.LatLng(37.385055891627005, 126.66453327634238)], 

        color: 'orange'
    },


    // 9. 먼우금초등학교
    {
        path: [new kakao.maps.LatLng(37.39532887837594, 126.65252803623568), new kakao.maps.LatLng(37.39371085526691, 126.65076251695591)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.394090026655554, 126.65408089277354), new kakao.maps.LatLng(37.391415422735214, 126.65149589078932)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.393265123430105, 126.65546241161256), new kakao.maps.LatLng(37.39174734491914, 126.65406907265134)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.39174734491914, 126.65406907265134), new kakao.maps.LatLng(37.390348327374255, 126.65632269199783)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.39541894574061, 126.65251632727934), new kakao.maps.LatLng(37.39412619902374, 126.65412589847251), new kakao.maps.LatLng(37.39190244686419, 126.65782881207397)], 

        color: 'orange'
    },


    // 10. 신송초등학교
    {
        path: [new kakao.maps.LatLng(37.39040405139165, 126.65226845745828), new kakao.maps.LatLng(37.38858365438707, 126.65522976277286)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.38876331238221, 126.65504261912369), new kakao.maps.LatLng(37.39178105602047, 126.65791405857011), new kakao.maps.LatLng(37.39074545998669, 126.65967474447008)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.39080797782759, 126.65948248958708), new kakao.maps.LatLng(37.38783537118463, 126.65662775614977)], 

        color: 'orange'
    },


     // 11. 신정초등학교, 명선초등학교, 연송초등학교, 채드윅송도국제학교, 한스랭어학원, 와이키즈인천송도센터

     {
        path: [new kakao.maps.LatLng(37.40326193000644, 126.6448112485935), new kakao.maps.LatLng(37.399942569650094, 126.64963809661887)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.40284655980799, 126.64152657161179), new kakao.maps.LatLng(37.39839692105204, 126.6479851297734)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.4013641101028, 126.63995246446503), new kakao.maps.LatLng(37.3980628318772, 126.6447341440977)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.39982737193053, 126.6383109170333), new kakao.maps.LatLng(37.395413674937906, 126.64467888915478)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.39601053508311, 126.64842543470449), new kakao.maps.LatLng(37.39688526421396, 126.64716213536254)], 

        color: 'gray'
    },

    {
        path: [new kakao.maps.LatLng(37.39545468634987, 126.6478464322577), new kakao.maps.LatLng(37.39633836880677, 126.64656615358187)], 

        color: 'gray'
    },

    {
        path: [new kakao.maps.LatLng(37.39726015799412, 126.64748788794745), new kakao.maps.LatLng(37.39594943358973, 126.64606543011905)], 

        color: 'gray'
    },

    {
        path: [new kakao.maps.LatLng(37.39687030622332, 126.64818990414096), new kakao.maps.LatLng(37.395586755232806, 126.64681248664532)], 

        color: 'gray'
    },

    {
        path: [new kakao.maps.LatLng(37.39668418185417, 126.64922976363287), new kakao.maps.LatLng(37.39487185515016, 126.64728450442023)], 

        color: 'gray'
    },

    {
        path: [new kakao.maps.LatLng(37.39990644580451, 126.6496100301729), new kakao.maps.LatLng(37.39539601109704, 126.64479755082058)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.40101896154243, 126.64801239422737), new kakao.maps.LatLng(37.39653539068456, 126.6431659328778)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.402131421467004, 126.64640341706334), new kakao.maps.LatLng(37.40066688653272, 126.64477267411299)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.40325283514752, 126.64478305565115), new kakao.maps.LatLng(37.398751113796855, 126.63993673121175)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.39909417450617, 126.64313121369464), new kakao.maps.LatLng(37.39762075550712, 126.64155710973466)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.40125780363982, 126.63980897397246), new kakao.maps.LatLng(37.39857059848935, 126.63688831095824)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.402731245222704, 126.64138311900906), new kakao.maps.LatLng(37.401393366918704, 126.63994385393624)], 

        color: 'gray'
    },


    // 12. 은송초등학교
    {
        path: [new kakao.maps.LatLng(37.4147653945603, 126.62717177062613), new kakao.maps.LatLng(37.414748225823644, 126.63031216302062),new kakao.maps.LatLng(37.412820084757215, 126.63032163926124),new kakao.maps.LatLng(37.41278820581453, 126.6287742747097)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.4164552057315, 126.62873358364581), new kakao.maps.LatLng(37.41296851230881, 126.62880727229357), new kakao.maps.LatLng(37.41078649389867, 126.62830974280989)], 

        color: 'orange'
    },


    // 13. 미송초등학교
    {
        path: [new kakao.maps.LatLng(37.41639569423176, 126.61436496551615), new kakao.maps.LatLng(37.413908864317285, 126.61435512349173), new kakao.maps.LatLng(37.4125133840084, 126.6146898539178)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.41533003317092, 126.61429982835057), new kakao.maps.LatLng(37.41532072822935, 126.61283137654519), new kakao.maps.LatLng(37.41517586542179, 126.61261749578344), new kakao.maps.LatLng(37.41337383125037, 126.61261548047842), new kakao.maps.LatLng(37.41321231751328, 126.61281963726265), new kakao.maps.LatLng(37.41320818109116, 126.6143107084952)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.41183729845774, 126.61389979910524), new kakao.maps.LatLng(37.41304136874276, 126.6156557649965)], 

        color: 'orange'
    },

    // 14. 송담초등학교
    {
        path: [new kakao.maps.LatLng(37.41224135625313, 126.61485221085145), new kakao.maps.LatLng(37.409068348359234, 126.61718397390878)], 

        color: 'orange'
    },

    // 15. 현송초등학교
    {
        path: [new kakao.maps.LatLng(37.395471808808665, 126.61851232433693), new kakao.maps.LatLng(37.394774008311686, 126.62006301121014)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.39276902052142, 126.6185937784895), new kakao.maps.LatLng(37.394774334832896, 126.62016464717537), new kakao.maps.LatLng(37.397373639014006, 126.62152933166702)], 

        color: 'orange'
    },


    // 16. 선학초등학교
    {
        path: [new kakao.maps.LatLng(37.42578603805972, 126.70137434224597), new kakao.maps.LatLng(37.42307318376238, 126.701057493379)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42419080189484, 126.7011999177136), new kakao.maps.LatLng(37.42407816943021, 126.70298536922907)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42312398030273, 126.69976939359863), new kakao.maps.LatLng(37.42297595628916, 126.70180350352555)], 

        color: 'orange'
    },


    // 17. 사랑유치원, 현대유치원

    {
        path: [new kakao.maps.LatLng(37.42596272610092, 126.69909996307894), new kakao.maps.LatLng(37.4258017557046, 126.70135450875335)], 

        color: 'orange'
    },



    /* 
    {
        path: [new kakao.maps.LatLng(), new kakao.maps.LatLng()], 

        color: 'orange'

    }
    */
    
    
]; 

//////////////////////// 구분 ////////////////////////////


// 구역 라인 폴리라인
//2조
var area_line = [
    {
        //선학동
        path: [new kakao.maps.LatLng(37.40662516553547, 126.68543993056815), new kakao.maps.LatLng(37.41015999120238, 126.686509509194), new kakao.maps.LatLng(37.414397988446964, 126.69115710985051), new kakao.maps.LatLng(37.41711182957152, 126.69531717827107), new kakao.maps.LatLng(37.419485490347206, 126.69863164586914), new kakao.maps.LatLng(37.42484649664839, 126.70396805061084), new kakao.maps.LatLng(37.426101379791454, 126.70495731604952), new kakao.maps.LatLng(37.427399743376284, 126.70531940570478), new kakao.maps.LatLng(37.4283928692123, 126.70522230336925), new kakao.maps.LatLng(37.42841166368011, 126.70553292867355), new kakao.maps.LatLng(37.42942757502894, 126.70554024773827), new kakao.maps.LatLng(37.43128933119184, 126.70600749543942), new kakao.maps.LatLng(37.43418312777416, 126.70662892198906), new kakao.maps.LatLng(37.434291234272855, 126.70662285052816), new kakao.maps.LatLng(37.43716161307988, 126.70507491956664), new kakao.maps.LatLng(37.438968083053446, 126.70505088079383), new kakao.maps.LatLng(37.43902725456546, 126.70259577989853), new kakao.maps.LatLng(37.439117298027114, 126.70257282405164), new kakao.maps.LatLng(37.439380813040295, 126.70256048133211), new kakao.maps.LatLng(37.439346186116566, 126.7022272746293), new kakao.maps.LatLng(37.439057644438016, 126.70214084490287),new kakao.maps.LatLng(37.43902836145077, 126.70124828148313)],

        color: '#dd43d0'

    },


        
    {
        path: [new kakao.maps.LatLng(37.43902836145077, 126.70124828148313), new kakao.maps.LatLng(37.43877286353579, 126.70086793223457), new kakao.maps.LatLng(37.43878616969948, 126.6981277012306), new kakao.maps.LatLng(37.438648523494194, 126.695399380971), new kakao.maps.LatLng(37.438373739491674, 126.6954089694229), new kakao.maps.LatLng(37.43827647393472, 126.69525116887677), new kakao.maps.LatLng(37.438213556673084, 126.69531074699152), new kakao.maps.LatLng(37.43830860603386, 126.69548268100172), new kakao.maps.LatLng(37.43727185046582, 126.69612812695699), new kakao.maps.LatLng(37.43686107304101, 126.69581057938638), new kakao.maps.LatLng(37.43363363647668, 126.69773880925986), new kakao.maps.LatLng(37.433745061975365, 126.69726945497915), new kakao.maps.LatLng(37.43373079418955, 126.69697573993595), new kakao.maps.LatLng(37.433565738027895, 126.69673347861263), new kakao.maps.LatLng(37.43334521808236, 126.68731109973851), new kakao.maps.LatLng(37.430227682287665, 126.68560105949723)],

        color: '#dd43d0'
    },
        
     
     

     //연수동, 청학동
     {
        path: [new kakao.maps.LatLng(37.430227682287665, 126.68560105949723), new kakao.maps.LatLng(37.431520736374885, 126.67727987752805), new kakao.maps.LatLng(37.430677544885484, 126.67536275615299), new kakao.maps.LatLng(37.43475414523766, 126.657628180385), new kakao.maps.LatLng(37.43133217515177, 126.6582764863325), new kakao.maps.LatLng(37.42756310226852, 126.66041764334085), new kakao.maps.LatLng(37.42733347673559, 126.66046387238435), new kakao.maps.LatLng(37.42654891742645, 126.66101253687035), new kakao.maps.LatLng(37.42578433807753, 126.6606742275001), new kakao.maps.LatLng(37.42475757406273, 126.65924406818948), new kakao.maps.LatLng(37.42389268885197, 126.65849388272719), new kakao.maps.LatLng(37.41639819332414, 126.6623065361662), new kakao.maps.LatLng(37.41566531095731, 126.66758516079355), new kakao.maps.LatLng(37.41678818749689, 126.66798121984743), new kakao.maps.LatLng(37.41685154662748, 126.66969234446582), new kakao.maps.LatLng(37.41759640421829, 126.67023695395979), new kakao.maps.LatLng(37.41699944985998, 126.67265700543646), new kakao.maps.LatLng(37.41531033456711, 126.67439267039624), new kakao.maps.LatLng(37.411992814911656, 126.67702762620749), new kakao.maps.LatLng(37.407864601489045, 126.68311079142532), new kakao.maps.LatLng(37.406492905337906, 126.68568049902727)], 

        color: '#dd43d0'
    },


    // 1조
    {
        path: [new kakao.maps.LatLng(37.43464354362518, 126.65754959070443), new kakao.maps.LatLng(37.43495360753637, 126.64807952104952), new kakao.maps.LatLng(37.43466911459872, 126.64709783408433), new kakao.maps.LatLng(37.43337687216319, 126.64658132823564), new kakao.maps.LatLng(37.4330167342774, 126.64667058737788), new kakao.maps.LatLng(37.432933003390396, 126.64654104467208), new kakao.maps.LatLng(37.433056223300426, 126.64631731344191), new kakao.maps.LatLng(37.4317299869318, 126.644233307665), new kakao.maps.LatLng(37.431454957976584, 126.64341263727997), new kakao.maps.LatLng(37.43146862354895, 126.64197200271275), new kakao.maps.LatLng(37.43098089360512, 126.64009877259461), new kakao.maps.LatLng(37.4311672444436, 126.63916010159618), new kakao.maps.LatLng(37.43050626861597, 126.63810122095164), new kakao.maps.LatLng(37.43060671392445, 126.63706692876119), new kakao.maps.LatLng(37.4308664761293, 126.63656854091823), new kakao.maps.LatLng(37.43107730724174, 126.63627375997314), new kakao.maps.LatLng(37.43125133194399, 126.63573058747801), new kakao.maps.LatLng(37.4317378188187, 126.63571128209533), new kakao.maps.LatLng(37.43151576774362, 126.63528866101983), new kakao.maps.LatLng(37.430989820166324, 126.63492966036296), new kakao.maps.LatLng(37.430584719780256, 126.63504461218425), new kakao.maps.LatLng(37.43061594073786, 126.63494277451262), new kakao.maps.LatLng(37.43104125239884, 126.63480795150302), new kakao.maps.LatLng(37.431020892669686, 126.63477980412046), 
        
        
   ],

        color: '#dd43d0'
    },

    
    {
        path: [   
        new kakao.maps.LatLng(37.431020892669686, 126.63477980412046), 
        
        new kakao.maps.LatLng(37.43060864229025, 126.6347676839121), new kakao.maps.LatLng(37.43044881979753, 126.63480235569692), new kakao.maps.LatLng(37.42990265809886, 126.63519197734794), new kakao.maps.LatLng(37.42448223810841, 126.6363847480195), new kakao.maps.LatLng(37.41616034142108, 126.63898641616076), new kakao.maps.LatLng(37.412700726864976, 126.64129888477574), new kakao.maps.LatLng(37.41158717938041, 126.64252411929454), new kakao.maps.LatLng(37.406739108092275, 126.64833012934061), new kakao.maps.LatLng(37.40323794671245, 126.65266093352058), new kakao.maps.LatLng(37.39570447971727, 126.66165122399356), new kakao.maps.LatLng(37.392332905812104, 126.66738049300982), new kakao.maps.LatLng(37.40112755280944, 126.67739331940598), new kakao.maps.LatLng(37.40272498065882, 126.68001803840882), new kakao.maps.LatLng(37.40323306759414, 126.68132037608889), new kakao.maps.LatLng(37.4040313400228, 126.68332176502174), new kakao.maps.LatLng(37.40512105216437, 126.68481371876888), new kakao.maps.LatLng(37.40658241278607, 126.68545705159903)], 

        color: '#dd43d0'

    },
    

    

    //송도
    // 5조 경계
    {
        path: [new kakao.maps.LatLng(37.40090791919882, 126.65543307097002), new kakao.maps.LatLng(37.39667630470903, 126.65113555543893), new kakao.maps.LatLng(37.37347505146426, 126.62606942166894)], 

        color: '#dd43d0'
    },

    //남동구쪽 해안도로
    {
        path: [new kakao.maps.LatLng(37.38719802224086, 126.68499321321544), new kakao.maps.LatLng(37.3888946722131, 126.67436014950754), new kakao.maps.LatLng(37.389734157336584, 126.67165765179371), new kakao.maps.LatLng(37.39264900881093, 126.66684551316774)], 

        color: '#dd43d0'
       
    },

    //3동 신항가는쪽 경계
    {
        path: [new kakao.maps.LatLng(37.387184567250756, 126.68501585340827), new kakao.maps.LatLng(37.35590675017203, 126.65476130200295)], 

        color: '#dd43d0'
       
    },

     // 인천대입구역 시작 - 달빛축제공원역
     {
        path: [new kakao.maps.LatLng(37.385697642404764, 126.63920591857276), new kakao.maps.LatLng(37.393286736758384, 126.63416116829389), new kakao.maps.LatLng(37.40656000507932, 126.62593611712651), new kakao.maps.LatLng(37.40852940317842, 126.62472904126012), new kakao.maps.LatLng(37.409303689990864, 126.62454445500467), new kakao.maps.LatLng(37.4102299096638, 126.6296792350801), new kakao.maps.LatLng(37.410729204359775, 126.63087409668537), new kakao.maps.LatLng(37.411407632195626, 126.63172923096629), new kakao.maps.LatLng(37.41270718270164, 126.63240061464637), new kakao.maps.LatLng(37.41638494990641, 126.63292486365371), new kakao.maps.LatLng(37.41757784233725, 126.63407128417202) //new kakao.maps.LatLng(), new kakao.maps.LatLng()
    ], 

    color: '#dd43d0'
    },

    // 송도 4동 경계
    {
        path: [new kakao.maps.LatLng(37.409308248795824, 126.62456137512997), new kakao.maps.LatLng(37.406696211026706, 126.60954095565009)
    ], 

    color: '#dd43d0'
    },

    // 송도 5동 경계
    {
        path: [new kakao.maps.LatLng(37.42789512011015, 126.6089563668078), new kakao.maps.LatLng(37.428203445706444, 126.63202545882575)
    ], 

    color: '#dd43d0'
    },
];

















/////////////////////////////////
///////      탄력구간       ////////





var elasticity = [

    // 금지시간 7:00~9:00, 18:00~20:00

      //    한나루로 86번길
    {
        path: [new kakao.maps.LatLng(37.42223581281587, 126.64732282615483), new kakao.maps.LatLng(37.422100026650384, 126.64786572763389), new kakao.maps.LatLng(37.42187641557464, 126.64841751064877), new kakao.maps.LatLng(37.42176318292374, 126.64897159941343), new kakao.maps.LatLng(37.42182547542373, 126.64946838275397), new kakao.maps.LatLng(37.42196830387688, 126.64977838888593), new kakao.maps.LatLng(37.42246821336817, 126.6504877864753), new kakao.maps.LatLng(37.42252315816924, 126.65078690807017), new kakao.maps.LatLng(37.422496342183976, 126.6516230284111)], 

        color: 'blue'

    },

    // 한나루로 86번길
    {
       path: [
       new kakao.maps.LatLng(37.42228431112672, 126.64772364956482), new kakao.maps.LatLng(37.42197583642398, 126.64852154455652), new kakao.maps.LatLng(37.421887514951905, 126.64912070624139), new kakao.maps.LatLng(37.42209648734761, 126.64970718451308), new kakao.maps.LatLng(37.422531007859526, 126.6503942923298), new kakao.maps.LatLng(37.42258172324617, 126.65078663609167), new kakao.maps.LatLng(37.42256494557425, 126.6512075366029)
       ] ,

       color: 'blue'
    },




    // 송도시장 금지시간 
    {
       path: [
       new kakao.maps.LatLng(37.42551514341654, 126.65637949328936), new kakao.maps.LatLng(37.42752541855157, 126.65750575437596)
       ],

       color: 'blue' 
    },



    //능허대로(동춘동952), (민방위 교육장~동막역사거리)
    //허용시간: 6:00~22:00(휴일)
    {
       path: [
       new kakao.maps.LatLng(37.40068059558239, 126.66569750493778), new kakao.maps.LatLng(37.39737656182786, 126.67148314634696)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.40084792008666, 126.66592264153132), new kakao.maps.LatLng(37.39749432004113, 126.6717085022109)
       ],

       color: 'blue' 
    },


    // 앵고개로264번길(동춘동959-1), 굿모닝이비인후과~인천수협 200m
    // 금지시간: 6:00~9:00, 18:00~20:00 (평일)
    {
       path: [
       new kakao.maps.LatLng(37.407164075044165, 126.67237224823661), new kakao.maps.LatLng(37.4069471527245, 126.67212752849628), new kakao.maps.LatLng(37.40668486611903, 126.67177005927287), new kakao.maps.LatLng(37.406571150177164, 126.67137805913525), new kakao.maps.LatLng(37.40657046713047, 126.67113239902183), new kakao.maps.LatLng(37.40661989207236, 126.67027659717108)
       ],

       color: 'blue' 
    },

    {
       path: [
       new kakao.maps.LatLng(37.407092401383984, 126.67251939448073), new kakao.maps.LatLng(37.40662472213226, 126.67201316121117), new kakao.maps.LatLng(37.40653853893575, 126.67180175845746), new kakao.maps.LatLng(37.40644730900095, 126.67139554228521), new kakao.maps.LatLng(37.406489269905386, 126.67028564072828)
       ],

       color: 'blue' 
    },


    // 비류대로 232번길, 청학도서관~세븐일레븐
    // 금지시간 : 7:00~16:00 (평일)
    {
       path: [
       new kakao.maps.LatLng(37.42579370475117, 126.66079846035719), new kakao.maps.LatLng(37.425406484722394, 126.6608736421804), new kakao.maps.LatLng(37.42473983254575, 126.66090771732024)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.42579112801851, 126.66068549459523), new kakao.maps.LatLng(37.42539488994211, 126.66075789326575), new kakao.maps.LatLng(37.424791291719295, 126.66078603617342)
       ],

       color: 'blue' 
    },

    // 청능대로 23번길 (청학동511-3), LF스퀘어~LF스퀘어 단측
    // 금지시간: 07:00~09:00, 18:00~20:00
    {
       path: [
       new kakao.maps.LatLng(37.41877297641793, 126.66969802656469), new kakao.maps.LatLng(37.418033395700675, 126.66943015687752)
       ],

       color: 'blue' 
    },

    // 용담로 현대성모의원~kb증권 양측
    // 금지시간 7:00~9:00, 18:00~20:00
    {
       path: [
       new kakao.maps.LatLng(37.41995329454835, 126.67212166842911), new kakao.maps.LatLng(37.41874354432476, 126.67370000583912), new kakao.maps.LatLng(37.41839317333188, 126.67407149065858), new kakao.maps.LatLng(37.41823124951059, 126.67416538939617), new kakao.maps.LatLng(37.41797250657836, 126.67427382777682), new kakao.maps.LatLng(37.41709475087107, 126.6745402713701), new kakao.maps.LatLng(37.416872109875044, 126.67467114342999), new kakao.maps.LatLng(37.41672384818554, 126.67481863768447), new kakao.maps.LatLng(37.415839886131245, 126.67610740766183), new kakao.maps.LatLng(37.415662626037744, 126.67635951191942), new kakao.maps.LatLng(37.415469582364665, 126.67660603475224)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.41568128755457, 126.67659382828215), new kakao.maps.LatLng(37.41676944198194, 126.67501612734115), new kakao.maps.LatLng(37.41697379919258, 126.67478931596199), new kakao.maps.LatLng(37.41811252784249, 126.67440595626977), new kakao.maps.LatLng(37.418499422730285, 126.67420941413019), new kakao.maps.LatLng(37.41884750268225, 126.67382381848518), new kakao.maps.LatLng(37.420086435358506, 126.67220863880587)
       ],

       color: 'blue' 
    },

    // 벚꽃로(청학동512), 연수역~용담공원입구 양측
    // 금지시간 7:00~9:00, 18:00~20:00
    {
       path: [
       new kakao.maps.LatLng(37.41767989717115, 126.67764145939732), new kakao.maps.LatLng(37.418448989846844, 126.6763503458769), new kakao.maps.LatLng(37.4188152130187, 126.6760070448147), new kakao.maps.LatLng(37.41916346156207, 126.67568076303853), new kakao.maps.LatLng(37.41936757180625, 126.67536357303447)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.41951881562828, 126.67548153656598), new kakao.maps.LatLng(37.4193371759586, 126.67577886066962), new kakao.maps.LatLng(37.418815932526066, 126.67626968988199), new kakao.maps.LatLng(37.418553092279424, 126.67652782020942), new kakao.maps.LatLng(37.41781982233169, 126.67773970443493)
       ],

       color: 'blue' 
    },

    //용담로 117번길 (연수동650-12), 연수장례식장~원피스모텔 양측
    // 금지시간 7:00~9:00, 18:00~20:00

    /*
    {
       path: [
       new kakao.maps.LatLng(37.41681420823123, 126.67903462641075), new kakao.maps.LatLng(37.416369128340946, 126.67854513546746), new kakao.maps.LatLng(37.416028392238786, 126.67832349025855), new kakao.maps.LatLng(37.415500797174296, 126.67813935939037)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.415397565950194, 126.6782810034163), new kakao.maps.LatLng(37.41594541037163, 126.67845657626832), new kakao.maps.LatLng(37.416268064730104, 126.67865570646013), new kakao.maps.LatLng(37.41675379667687, 126.6791845613367)
       ],

       color: 'blue' 
    },

    */

    // 연수2동, 연수동650, 힘찬병원~모든치과, 양면    (불명확)
    // 금지시간: 7:00~9:00, 18:00~20:00
    
  {
       path: [
       new kakao.maps.LatLng(37.415317862648884, 126.67713760707622), new kakao.maps.LatLng(37.413087818913354, 126.68044273905454)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.41523846928627, 126.67693461702058), new kakao.maps.LatLng(37.4129186055825, 126.68034179560398)
       ],

       color: 'blue' 
    },
    

    // 용담로 117번길(연수650-12, 연수동 650-14) 연수장례식장~스타벅스, 양면
    // 금지시간: 7:00~9:00, 18:00~20:00
    {
       path: [
       new kakao.maps.LatLng(37.41681872858862, 126.67904025531828), new kakao.maps.LatLng(37.41638707164411, 126.67851681795102), new kakao.maps.LatLng(37.41595847216031, 126.67828990049323), new kakao.maps.LatLng(37.414882908967556, 126.67788501701565)
       ],

       color: 'blue' 
    },

    {
       path: [
       new kakao.maps.LatLng(37.416760561875506, 126.67918735657672), new kakao.maps.LatLng(37.416256786818906, 126.67865010648845), new kakao.maps.LatLng(37.41606270226933, 126.67851538032275), new kakao.maps.LatLng(37.41483832794613, 126.6780574734339)
       ],

       color: 'blue' 
    },


    // 용담로 118번길 (연수동 651-16), 힘찬병원~선우빌딩, 양면
     // 금지시간: 7:00~9:00, 18:00~20:00
     {
       path: [
       new kakao.maps.LatLng(37.41431614236596, 126.67737912324601), new kakao.maps.LatLng(37.413823567549336, 126.67682208660979)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.4142534726536, 126.67752624017898), new kakao.maps.LatLng(37.41372022983676, 126.67692419396474)
       ],

       color: 'blue' 
    },


    //새말로(연수동645-10), 문화공원입구~세경아파트 입구 ,평일허용, 양면
    // 금지시간: 7:00~9:00, 18:00~20:00
    {
       path: [
       new kakao.maps.LatLng(37.418349038698196, 126.68018033217004), new kakao.maps.LatLng(37.4184874987996, 126.6814054296086), new kakao.maps.LatLng(37.41846628173582, 126.68189127519966), new kakao.maps.LatLng(37.418368037083596, 126.68221364469899), new kakao.maps.LatLng(37.41809450503751, 126.68268925721952), new kakao.maps.LatLng(37.41739931324068, 126.68384443167909)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.417516655328306, 126.68392301393278), new kakao.maps.LatLng(37.41840031588553, 126.68249027585725), new kakao.maps.LatLng(37.418597109771675, 126.68195850181205), new kakao.maps.LatLng(37.418632450695014, 126.68169852896185), new kakao.maps.LatLng(37.41861767246879, 126.68122977982257), new kakao.maps.LatLng(37.41851138757635, 126.68024177335978)
       ],

       color: 'blue' 
    },
    
    
    // 함박뫼로 152번길(연수동645-8), 영남아파트 측면~연수도서관, 단면, 평일허용
    // 허용시간 9:00~22:00 (승용차만)
    {
       path: [
       new kakao.maps.LatLng(37.42002152364439, 126.68309911106824), new kakao.maps.LatLng(37.41982829204136, 126.6832806749214), new kakao.maps.LatLng(37.419114561898816, 126.68424390384281), new kakao.maps.LatLng(37.4188701763168, 126.68467138055594), new kakao.maps.LatLng(37.41833325629011, 126.68605746837952)
       ],

       color: 'blue' 
    },
  
    //함박뫼로(연수동646), 버스정류장~대학공원약수터, 양측, 주말 공휴일 허용
    // 주말 허용시간 : 6:00~22:00
    // 양측 맞는지 모르겠음... 로드뷰상에는 반대편 표지판 없음

  {
       path: [
       new kakao.maps.LatLng(37.421430330278824, 126.68262152073197), new kakao.maps.LatLng(37.42139130017764, 126.68318653966867), new kakao.maps.LatLng(37.421528325799905, 126.68388638288862), new kakao.maps.LatLng(37.42192739176227, 126.68486755868982), new kakao.maps.LatLng(37.42203197038373, 126.68522863022449)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.42161060695033, 126.68264900266334), new kakao.maps.LatLng(37.42158491013617, 126.68314618409279), new kakao.maps.LatLng(37.4216491151362, 126.68356955567658), new kakao.maps.LatLng(37.42190787968169, 126.68430843092548), new kakao.maps.LatLng(37.422189270065196, 126.68508675671842)
       ],

       color: 'blue' 
    },

    // 선학로(선학동343), 선학행정복지센터~은행나무어린이공원, 양면, 평일 허용
    // 금지시간 7:00~9:00, 18:00~20:00
    // ??? 탄력 확인필요
    /*
    {
       path: [
       new kakao.maps.LatLng(), new kakao.maps.LatLng(), new kakao.maps.LatLng(), new kakao.maps.LatLng(), new kakao.maps.LatLng(), new kakao.maps.LatLng(), new kakao.maps.LatLng(), new kakao.maps.LatLng(), new kakao.maps.LatLng(), new kakao.maps.LatLng(), new kakao.maps.LatLng()
       ],

       color: 'blue' 
    },
    */



    // 선학로(선학동351), 선학스파24시~뉴서울아파트입구, 양면, 평일허용
    // 금지시간 7:00~9:00, 18:00~20:00
    {
       path: [
       new kakao.maps.LatLng(37.425901922642566, 126.69910585529871), new kakao.maps.LatLng(37.425834671298915, 126.70012009808032)
       ],

       color: 'blue' 
    },
    {
       path: [
       new kakao.maps.LatLng(37.42594283489681, 126.70013661333473), new kakao.maps.LatLng(37.42601684391195, 126.69912234206532)
       ],

       color: 'blue' 
    },


    // 청학근린공원 옆
      
        {
            path: [new kakao.maps.LatLng(37.41570703437768, 126.67612492409596), new kakao.maps.LatLng(37.41523772252748, 126.67583889290418)], 
    
            color: 'blue'
    
        },
        {
            path: [new kakao.maps.LatLng(37.415621887539544, 126.67628908586406), new kakao.maps.LatLng(37.41528351579264, 126.67610980350095), new kakao.maps.LatLng(37.41452047866529, 126.67549745445031)], 
    
            color: 'blue'
    
        },


        //롯데마트 앞
        //금지시간: 7:00~12:00, 14:00~20:00
        {
            path: [new kakao.maps.LatLng(37.41754950771325, 126.67119171412823), new kakao.maps.LatLng(37.41723760580317, 126.6724356879856), new kakao.maps.LatLng(37.41703150094169, 126.67284325697425), new kakao.maps.LatLng(37.415414214486205, 126.67448823826531)], 
    
            color: 'blue'
    
        },
        
];


/* 
var elasticity = [
      
    {
        path: [new kakao.maps.LatLng(), new kakao.maps.LatLng()], 

        color: 'orange'

    },
    
];
*/


// 여러개 배열 만들고 data라는 배열 값으로 합쳐 하나의 배열로 만들기
var data = [
    ...child,
]


//소화전, 탄력구간 배열
//var fireplug = []
//var elasticity = []
//var area_line = []




function childON() {
    
//배열 이용해서 폴리라인 여러개 표시하기
for(var i=0; i<data.length; i++) {

    //i번째 정보를 가져옵니다.
    var item = data[i];

    // 지도에 표시할 선을 생성합니다
	var polyline = new kakao.maps.Polyline({

        map: map, //지도에 선을 표시합니다.
    	path: item.path, // 선을 구성하는 좌표배열 입니다
	    strokeWeight: 5, // 선의 두께 입니다
    	strokeColor: item.color, // 선의 색깔입니다
	    strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    	strokeStyle: 'solid' // 선의 스타일입니다
	});

}
}


//배열 이용해서 폴리라인 여러개 표시하기
for(var i=0; i<area_line.length; i++) {

    //i번째 정보를 가져옵니다.
    var item = area_line[i];
    
    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
    
        map: map, //지도에 선을 표시합니다.
        path: item.path, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 2, // 선의 두께 입니다
        strokeColor: item.color, // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    });
    
    }




    function elasticityONON() {
        if (!confirm("탄력구간 허용, 금지시간을 지도에 함께 표시할까요?\n취소를 클릭하면 탄력구간 선만 표시합니다.\n\n확인 : 탄력구간 허용, 금지시간 함께 표시\n취소 : 탄력구간 선만 표시")) {
            elasticityON();
        } else {
            // 확인 누르면
            elasticityON(); elasticityinfo(); 
        }
    }




function elasticityON() {
    //배열 이용해서 폴리라인 여러개 표시하기
    for(var i=0; i<elasticity.length; i++) {
    
    //i번째 정보를 가져옵니다.
    var item = elasticity[i];
    
    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
    
        map: map, //지도에 선을 표시합니다.
        path: item.path, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 4, // 선의 두께 입니다
        strokeColor: item.color, // 선의 색깔입니다
        strokeOpacity: 0.6, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'dashed' // 선의 스타일입니다
    });
    
    }
    
    }

// 지도에 선을 표시합니다 
polyline.setMap(map);  


///////////////////////////

///////////////////////////



var positions2 = [

    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00</div>',

        latlng: new kakao.maps.LatLng(37.42751182169871, 126.65747757132587),
        
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.422244001708286, 126.64780291881473),
        
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>6:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.4068340335853, 126.6719501268478),
        
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">허용시간(공휴일)<br>6:00~22:00</div>',

        latlng: new kakao.maps.LatLng(37.40074072429954, 126.66625064277306),
        
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~16:00</div>',

        latlng: new kakao.maps.LatLng(37.425777945326836, 126.66080135588876),
        
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.41878427841361, 126.66971209778787),
        
        
    },
//3
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.42011576495727, 126.67222545629922),
        
        
    },


    //4
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.419494224059235, 126.67554942346463),
        
        
    },


    //5-1
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.41526411079681, 126.67725079942623),
        
        
    },

    //5-2
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.41682770796683, 126.67902892060202),
        
        
    },

    //5-3
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.41434536337322, 126.67735640586535),
        
        
    },

    //6-1
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.418645539846494, 126.68154032016498),
        
        
    },

    //6-2
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">승용차에 한하여 허용(평일)<br>9:00~22:00</div>',

        latlng: new kakao.maps.LatLng(37.42006931076084, 126.68327965986722),
        
        
    },

    //6-3
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">허용시간(주말,공휴일)<br>6:00~22:00</div>',

        latlng: new kakao.maps.LatLng(37.4222000886187, 126.68492007761894),
        
        
    },


    // 7-2
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">금지시간(평일)<br>7:00~9:00<br>18:00~20:00</div>',

        latlng: new kakao.maps.LatLng(37.42602167954837, 126.69925224723602),
        
        
    },

   /// 원도심 끝, 송도동 시작


/*
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">내용</div>',

        latlng: new kakao.maps.LatLng(),
        
        
    },
*/


    ];









///// 인포 윈도우

var infow = [
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%;">연수,청학,선학</div>',

        latlng: new kakao.maps.LatLng(37.42974988093744, 126.68805197322187),
        
        
    },

    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%;">동춘,옥련</div>',

        latlng: new kakao.maps.LatLng(37.413002704796696, 126.65651573003171),
     
        
    },

    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%;">송도 1,3동</div>',

        latlng: new kakao.maps.LatLng(37.3774530380526, 126.6518907521165),
 
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%;">송도 2동</div>',

        latlng: new kakao.maps.LatLng(37.40308318444747, 126.64156215092412),
     
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%;">송도 4동</div>',

        latlng: new kakao.maps.LatLng(37.38916732495429, 126.61723719700473),
     
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px; width:100%">송도5동</div>',

        latlng: new kakao.maps.LatLng(37.42218605770103, 126.6161654160096),
     
        
    },


    ];
    
    


function infowindowON () {

for (var i = 0; i < infow.length; i ++) {
    // 커스텀 오버레이를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        position: infow[i].latlng,
        map: map,
        content: infow[i].Content ,
        removable : true
    
        
    });
    
     infowindow.open(map); 


      // 이동할 위도 경도 위치를 생성합니다 
      var moveLatLon = new kakao.maps.LatLng(37.400090833261295, 126.65332203353034);
    
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
    //
    map.setLevel(7);
    //
    }

}
   //////////




   //// 탄력구간 인포윈도우 생성

function elasticityinfo () {

  
// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
 


for (var i = 0; i < positions.length; i ++) {

    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    


    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions2[i].latlng, // 마커의 위치
        image : markerImage // 마커 이미지 
    });

    // 마커에 표시할 인포윈도우를 생성합니다 
    var infowindow = new kakao.maps.InfoWindow({
        content: positions2[i].Content, // 인포윈도우에 표시할 내용
        removable : true
    });

    
infowindow.open(map, marker);

          // 이동할 위도 경도 위치를 생성합니다 
          var moveLatLon = new kakao.maps.LatLng(37.400090833261295, 126.65332203353034);
        
        // 지도 중심을 이동 시킵니다
        map.setCenter(moveLatLon);
        //
        map.setLevel(7);
        //
        }
    
    }


