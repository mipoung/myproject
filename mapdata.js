

       

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


    // 18. 선학 어린이집
    {
        path: [new kakao.maps.LatLng(37.42281405179885, 126.70102180733525), new kakao.maps.LatLng(37.42205697842618, 126.70093443989512), new kakao.maps.LatLng(37.421081401758066, 126.69995547702669)], 

        color: 'orange'
    },


    // 19. 산들 어린이집
    {
        path: [new kakao.maps.LatLng(37.426872964845266, 126.69697937391956), new kakao.maps.LatLng(37.42663348875548, 126.69670354113258), new kakao.maps.LatLng(37.42640306558505, 126.69644462030851), new kakao.maps.LatLng(37.42554305556714, 126.69662320697786), new kakao.maps.LatLng(37.42449112507129, 126.69662462691838), new kakao.maps.LatLng(37.42450992758217, 126.6969295850854), new kakao.maps.LatLng(37.425460820829215, 126.69705567579506)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42554532982411, 126.6966316710856), new kakao.maps.LatLng(37.42533219911626, 126.69784703165715)], 

        color: 'orange'
    },


    // 20. 경인 어린이집
    {
        path: [new kakao.maps.LatLng(37.430855822477454, 126.69624868919985), new kakao.maps.LatLng(37.4313073834566, 126.69665926267385), new kakao.maps.LatLng(37.430754222183786, 126.6970343451354), new kakao.maps.LatLng(37.429970029990564, 126.69691322337451), new kakao.maps.LatLng(37.42955588663459, 126.69703917452217), new kakao.maps.LatLng(37.42918734307042, 126.69737960751452)], 

        color: 'orange'
    },

    // 21. 다예린 어린이집
    {
        path: [new kakao.maps.LatLng(37.430846754369625, 126.6962261288234), new kakao.maps.LatLng(37.430561019460995, 126.6954815847192), new kakao.maps.LatLng(37.430549742358124, 126.69547598116878), new kakao.maps.LatLng(37.43014286305842, 126.69492400764514), new kakao.maps.LatLng(37.42944423494215, 126.69479126318436), new kakao.maps.LatLng(37.42916872827415, 126.6945212235428)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42946677462992, 126.69479682082716), new kakao.maps.LatLng(37.42887000973555, 126.69573134596679)], 

        color: 'orange'
    },


    // 22. 미래클 예능 어린이집
    {
        path: [new kakao.maps.LatLng(37.428329552543545, 126.69579002395761), new kakao.maps.LatLng(37.42819046362288, 126.69601089989973), new kakao.maps.LatLng(37.429194028290496, 126.69735133495216)], 

        color: 'orange'
    },


    {
        path: [new kakao.maps.LatLng(37.42845841327956, 126.69640948850605), new kakao.maps.LatLng(37.427713417894175, 126.69751970460611)], 

        color: 'orange'
    },

    // 23. 참아름유치원
    {
        path: [new kakao.maps.LatLng(37.423661225346024, 126.64342135725757), new kakao.maps.LatLng(37.42420510892204, 126.64450898630048)], 

        color: 'orange'
    },

    // 24. 옥련초등학교
    {
        path: [new kakao.maps.LatLng(37.42682704047676, 126.64600485774174), new kakao.maps.LatLng(37.42605931822915, 126.65144270225852)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42601320245816, 126.64804228770012), new kakao.maps.LatLng(37.425801761334945, 126.64965885380207)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42650885355884, 126.64807386099429), new kakao.maps.LatLng(37.42453535980388, 126.64798142013754)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.426252663320476, 126.64979232641582), new kakao.maps.LatLng(37.42490923486051, 126.64948225087358), new kakao.maps.LatLng(37.42456685458536, 126.64948384696369)], 

        color: 'orange'
    },

    // 25. 능허대초등학교
    {
        path: [new kakao.maps.LatLng(37.42439125465818, 126.64649082161195), new kakao.maps.LatLng(37.42447663726091, 126.64944472614786), new kakao.maps.LatLng(37.42313890219858, 126.64953569277051), new kakao.maps.LatLng(37.423058415451564, 126.6467117368759)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42441817926031, 126.64796502244569), new kakao.maps.LatLng(37.422616110448175, 126.64795086462738)], 

        color: 'orange'
    },


    // 26. 오렌지 어린이집
    {
        path: [new kakao.maps.LatLng(37.422143713958285, 126.64665389981356), new kakao.maps.LatLng(37.421619849563776, 126.64622707130253), new kakao.maps.LatLng(37.42083137231408, 126.64619688966951)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42207981301539, 126.64788559235014), new kakao.maps.LatLng(37.42192467256233, 126.64722543531445), new kakao.maps.LatLng(37.42106777729061, 126.64691313848549), new kakao.maps.LatLng(37.420669834306, 126.64641229199674)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42191331698588, 126.64644033654763), new kakao.maps.LatLng(37.4217532126559, 126.64713586265829)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.421516302072355, 126.64625015262605), new kakao.maps.LatLng(37.42134729003287, 126.64697960847973)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42106779416089, 126.6469187869186), new kakao.maps.LatLng(37.42090324928745, 126.64763691899331)], 

        color: 'orange'
    },
 
    // 26. 아이웰 어린이집
    {
        path: [new kakao.maps.LatLng(37.4245268837414, 126.65120126020365), new kakao.maps.LatLng(37.42456111526439, 126.65211620303982), new kakao.maps.LatLng(37.424894950974256, 126.65227282488937)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.424565636892424, 126.65212183089554), new kakao.maps.LatLng(37.42301433123771, 126.65312317198826)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42326807894219, 126.6520882932637), new kakao.maps.LatLng(37.42329756637508, 126.65292416157494)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42406878086514, 126.65244610773331), new kakao.maps.LatLng(37.42464584764257, 126.65335571866567), new kakao.maps.LatLng(37.424921431189674, 126.65361994188937), new kakao.maps.LatLng(37.42501074254425, 126.65411945010524)], 

        color: 'orange'
    },

    // 27. 축현초등학교
    {
        path: [new kakao.maps.LatLng(37.422617300766156, 126.64986856861266), new kakao.maps.LatLng(37.42271985151037, 126.65103171032756), new kakao.maps.LatLng(37.422690558963446, 126.65332519210273), new kakao.maps.LatLng(37.424372927263335, 126.65554304770002)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42156191908438, 126.65251700407326), new kakao.maps.LatLng(37.422627290069684, 126.65325770022531)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.423410591856886, 126.65459847628452), new kakao.maps.LatLng(37.42363676602077, 126.65491376491647), new kakao.maps.LatLng(37.42326370748075, 126.65520920827694), new kakao.maps.LatLng(37.423110290072245, 126.65512518173992), new kakao.maps.LatLng(37.42243909334106, 126.65514520593928)], 

        color: 'orange'
    },

    // 28. 평화의샘 유치원
    {
        path: [new kakao.maps.LatLng(37.42242554536104, 126.65513397083984), new kakao.maps.LatLng(37.42140757552475, 126.65365307357493), new kakao.maps.LatLng(37.42145287375975, 126.65296939132936), new kakao.maps.LatLng(37.42157804351003, 126.65263837342282)], 

        color: 'orange'
    },

    // 29. 동그라미 어린이집
    {
        path: [new kakao.maps.LatLng(37.42543854188873, 126.65637419452725), new kakao.maps.LatLng(37.42519663345851, 126.65684415248747), new kakao.maps.LatLng(37.42440214524367, 126.65784760970514)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.425312943419726, 126.6565611800175), new kakao.maps.LatLng(37.42455010278151, 126.65605062581918)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42514707838369, 126.65684437865261), new kakao.maps.LatLng(37.424406878918546, 126.6563732605594)], 

        color: 'orange'
    },

    // 30. 송도초등학교
    {
        path: [new kakao.maps.LatLng(37.42809526267244, 126.65593837382212), new kakao.maps.LatLng(37.42709295264461, 126.66142245855208)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.4258698142292, 126.65906673676972), new kakao.maps.LatLng(37.42733971641398, 126.6595006921652)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42575381022226, 126.65634450934395), new kakao.maps.LatLng(37.42772120622812, 126.65744272330741)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42678285468165, 126.6569950832267), new kakao.maps.LatLng(37.42656019075765, 126.65788862945676), new kakao.maps.LatLng(37.42753500346193, 126.658482987701)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.4259979669254, 126.65664843312807), new kakao.maps.LatLng(37.42623383385123, 126.6572009483951)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42651684624104, 126.6569228607933), new kakao.maps.LatLng(37.42623835523805, 126.65720657668291)], 

        color: 'orange'
    },

    // 31. 새싹 유치원
    {
        path: [new kakao.maps.LatLng(37.416866591723114, 126.65369657855345), new kakao.maps.LatLng(37.41728288761239, 126.65432161518197), new kakao.maps.LatLng(37.417520001300595, 126.65529767211399)], 

        color: 'orange'
    },

    // 32. 청학숲 유치원
    {
        path: [new kakao.maps.LatLng(37.4304370986906, 126.66348630996663), new kakao.maps.LatLng(37.43083134722872, 126.66429803691507), new kakao.maps.LatLng(37.43120654533158, 126.66474830352675)], 

        color: 'orange'
    },

    // 33. 은빛나무 어린이집
    {
        path: [new kakao.maps.LatLng(37.43041032593215, 126.6635768172826), new kakao.maps.LatLng(37.427166013159905, 126.6633427803176)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42867627892612, 126.66213841106276), new kakao.maps.LatLng(37.42860178585797, 126.66445486901434), new kakao.maps.LatLng(37.42847689554554, 126.66489605402475)], 

        color: 'orange'
    },

    // 34. 새샘어린이집
    {
        path: [new kakao.maps.LatLng(37.426414958561104, 126.66858268939477), new kakao.maps.LatLng(37.426119968700796, 126.66942002620202)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.426258565066775, 126.66904094013354), new kakao.maps.LatLng(37.42760244912385, 126.66953213692477)], 

        color: 'orange'
    },

    // 35. 청학 어린이집
    {
        path: [new kakao.maps.LatLng(37.4253547581457, 126.66090211966853), new kakao.maps.LatLng(37.42543925319045, 126.66209082005145), new kakao.maps.LatLng(37.425648346777606, 126.66274232354148), new kakao.maps.LatLng(37.42501377855162, 126.6645527895229)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42653306750078, 126.66334843894462), new kakao.maps.LatLng(37.426151538442774, 126.66542894135988), new kakao.maps.LatLng(37.425991561783555, 126.66620919938991), new kakao.maps.LatLng(37.42568732411769, 126.66695619988074)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.4268483859334, 126.66333572915619), new kakao.maps.LatLng(37.42555966373282, 126.663239820334)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42644441406965, 126.6638572385981), new kakao.maps.LatLng(37.42541707913746, 126.66379404543852)], 

        color: 'orange'
    },


    // 36. 건강한새싹 어린이집
    {
        path: [new kakao.maps.LatLng(37.42560858190424, 126.66699044180871), new kakao.maps.LatLng(37.42272921468846, 126.66517303433083)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42491752973149, 126.66476787348634), new kakao.maps.LatLng(37.424263826189474, 126.66619427430764), new kakao.maps.LatLng(37.42359256152862, 126.66779018912018)], 

        color: 'orange'
    },

    // 37. 꿈동산 유치원
    {
        path: [new kakao.maps.LatLng(37.42349198230265, 126.67048506237477), new kakao.maps.LatLng(37.42460622921757, 126.66940691083629)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.423551850692206, 126.66933811341151), new kakao.maps.LatLng(37.42434563325269, 126.66965660213256)], 

        color: 'orange'
    },


    // 38. 청학 초등학교
    {
        path: [new kakao.maps.LatLng(37.42137365080811, 126.66853430192286), new kakao.maps.LatLng(37.420171396182575, 126.67197950630117), new kakao.maps.LatLng(37.41945315990766, 126.67290897584319)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.4206540114487, 126.67056527994036), new kakao.maps.LatLng(37.419129677289575, 126.66998452682819)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42017125511955, 126.67192867087678), new kakao.maps.LatLng(37.41789827745093, 126.67105745480141)], 

        color: 'orange'
    },


    // 39. 미상지 유치원
    {
        path: [new kakao.maps.LatLng(37.41891710955361, 126.67292825234695), new kakao.maps.LatLng(37.41836036039275, 126.67360847118478), new kakao.maps.LatLng(37.417820441982535, 126.67304316294664)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.41832068734417, 126.6722954112835), new kakao.maps.LatLng(37.41807569387868, 126.67330187469663), new kakao.maps.LatLng(37.417938953888644, 126.67354252064045)], 

        color: 'orange'
    },
    {
        path: [new kakao.maps.LatLng(37.41892105965527, 126.67272771856247), new kakao.maps.LatLng(37.41829199165563, 126.67250734786144)], 

        color: 'orange'
    },

    // 40. 하늘땅 유치원
    {
        path: [new kakao.maps.LatLng(37.42635717078605, 126.68366554497119), new kakao.maps.LatLng(37.426072740637395, 126.68427964665904), new kakao.maps.LatLng(37.42589736167238, 126.68439900959719), new kakao.maps.LatLng(37.42594279980055, 126.68370118166996)], 

        color: 'orange'
    },

    // 41. 해나라 유치원
    {
        path: [new kakao.maps.LatLng(37.42363355380444, 126.67361100237899), new kakao.maps.LatLng(37.42265415422656, 126.67459246750151)], 

        color: 'orange'
    },

    // 42. 함박 초등학교
    {
        path: [new kakao.maps.LatLng(37.424773872215134, 126.67544191086101), new kakao.maps.LatLng(37.42460809307781, 126.67741970042873)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42461488068449, 126.67660624649781), new kakao.maps.LatLng(37.423326044035015, 126.67646492374605)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.422799744091215, 126.67511151296307), new kakao.maps.LatLng(37.423225788935866, 126.67604735286785), new kakao.maps.LatLng(37.42333666037272, 126.67705234155122), new kakao.maps.LatLng(37.4230065851258, 126.67826257297965)], 

        color: 'orange'
    },

    // 43. 문남초등학교, 신도유치원
    {
        path: [new kakao.maps.LatLng(37.423712479481466, 126.68274463320995), new kakao.maps.LatLng(37.42261255698841, 126.68248943673622), new kakao.maps.LatLng(37.419505330609084, 126.67962187170934)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42106994945564, 126.67846290847731), new kakao.maps.LatLng(37.42011025776393, 126.68008246714997)], 

        color: 'orange'
    },

    // 44. 연수 유치원
    {
        path: [new kakao.maps.LatLng(37.4195278240903, 126.68127675760536), new kakao.maps.LatLng(37.420090760784525, 126.68287852997433)], 

        color: 'orange'
    },

    // 45. 연수초등학교
    {
        path: [new kakao.maps.LatLng(37.42292432036115, 126.69133956715108), new kakao.maps.LatLng(37.42319648085102, 126.69552976994792)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.42160569136081, 126.69359310637431), new kakao.maps.LatLng(37.422992887727986, 126.69345188594225)], 

        color: 'orange'
    },

    // 46. 한울 유치원
    {
        path: [new kakao.maps.LatLng(37.421704772649676, 126.69358140551998),new kakao.maps.LatLng(37.42113728575494, 126.6936402031252), new kakao.maps.LatLng(37.42049727917721, 126.69352984089562), new kakao.maps.LatLng(37.41925101658944, 126.69242783661153)], 

        color: 'orange'
    },

    // 47. 다슬기 유치원
    {
        path: [new kakao.maps.LatLng(37.417547661805166, 126.68372519475099), new kakao.maps.LatLng(37.4157711777019, 126.68655107698899)], 

        color: 'orange'
    },

    // 48. 중앙초등학교
    {
        path: [new kakao.maps.LatLng(37.41774661997431, 126.68568995555833), new kakao.maps.LatLng(37.41687941461609, 126.68485199732004)], 

        color: 'orange'
    },

    // 49. 느티나무 어린이집
    {
        path: [new kakao.maps.LatLng(37.414570050438485, 126.6855055487782), new kakao.maps.LatLng(37.416282369510434, 126.6873509852), new kakao.maps.LatLng(37.41665862853949, 126.68823618655297)], 

        color: 'orange'
    },

    // 50. 인천 연일학교
    {
        path: [new kakao.maps.LatLng(37.421141307889144, 126.68828538554143), new kakao.maps.LatLng(37.420038297528826, 126.69027820891372)], 

        color: 'orange'
    },

    {
        path: [new kakao.maps.LatLng(37.41962432002906, 126.68874919465388), new kakao.maps.LatLng(37.41996685064863, 126.68880426135524), new kakao.maps.LatLng(37.420472602085766, 126.68925404641588)], 

        color: 'orange'
    },


    /* 51. 예량 유치원
    {
        path: [new kakao.maps.LatLng(37.41306111690126, 126.68056428268693), new kakao.maps.LatLng(37.41501745159745, 126.68265705408722)], 

        color: 'orange'
    },
    {
        path: [new kakao.maps.LatLng(37.415825303467784, 126.68151837274114), new kakao.maps.LatLng(37.414340491091906, 126.68389117691805)], 

        color: 'orange'
    },
    */

    // 52. 연화초등학교, 키즈월드 유치원
    {
        path: [new kakao.maps.LatLng(37.41285854327246, 126.68062162193509), new kakao.maps.LatLng(37.41210453174205, 126.6816753223015)], 

        color: 'orange'
    },
    {
        path: [new kakao.maps.LatLng(37.41042375089569, 126.67986386923252), new kakao.maps.LatLng(37.412122612677955, 126.68169783717268), new kakao.maps.LatLng(37.41266719064409, 126.68317527919405)], 

        color: 'orange'
    },

    // 53. 하은어린이집
    {
        path: [new kakao.maps.LatLng(37.413983539683294, 126.67193024470814), new kakao.maps.LatLng(37.41475388047877, 126.67354787289098), new kakao.maps.LatLng(37.415518501317514, 126.67309835441658)], 

        color: 'orange'
    },
    {
        path: [new kakao.maps.LatLng(37.414075209645205, 126.67087367058028), new kakao.maps.LatLng(37.41407616825354, 126.67121819383523), new kakao.maps.LatLng(37.41479636939086, 126.67262140904538), new kakao.maps.LatLng(37.41567165643472, 126.67309204065853), new kakao.maps.LatLng(37.41601492784457, 126.67341249248153)], 

        color: 'orange'
    },

    // 54. 청량초등학교
    {
        path: [new kakao.maps.LatLng(37.41084992187489, 126.67262164078636), new kakao.maps.LatLng(37.412878663480925, 126.67478160579812)], 

        color: 'orange'
    },
    {
        path: [new kakao.maps.LatLng(37.413030500341996, 126.67104203111091), new kakao.maps.LatLng(37.41329130078791, 126.67248676121211), new kakao.maps.LatLng(37.41318491524555, 126.6731141440113), new kakao.maps.LatLng(37.41246712018937, 126.67420730224501)], 

        color: 'orange'
    },

    // 55. 동춘 초등학교
    {
        path: [new kakao.maps.LatLng(37.41161366051655, 126.66702134143746), new kakao.maps.LatLng(37.40943343049962, 126.6703179191088)], 

        color: 'orange'
    },

    // 56. 숲속햇살 어린이집
    {
        path: [new kakao.maps.LatLng(37.407886525979364, 126.66651261774548), new kakao.maps.LatLng(37.40679623850201, 126.6680930871997)], 

        color: 'orange'
    },

    // 57. 연성초등학교
    {
        path: [new kakao.maps.LatLng(37.41001710470144, 126.67942508006362), new kakao.maps.LatLng(37.40816466686337, 126.67745633150496), new kakao.maps.LatLng(37.40766852799188, 126.67724385307653)], 

        color: 'orange'
    },

    // 58. 서면초등학교, 동막초등학교, 부광예능어린이집
    {
        path: [new kakao.maps.LatLng(37.40315898371544, 126.66750488370954), new kakao.maps.LatLng(37.40287777149804, 126.67328880809829), new kakao.maps.LatLng(37.40126233447906, 126.67561110367706)], 

        color: 'orange'
    },
    {
        path: [new kakao.maps.LatLng(37.40511892090647, 126.67569612973834), new kakao.maps.LatLng(37.40285083492727, 126.67332280794021)], 

        color: 'orange'
    },
    {
        path: [new kakao.maps.LatLng(37.40623846889151, 126.6700100170556), new kakao.maps.LatLng(37.40039862588551, 126.6695612807173)], 

        color: 'orange'
    },

    // 59. 박문초등학교
    {
        path: [new kakao.maps.LatLng(37.40275427302085, 126.66617112323475), new kakao.maps.LatLng(37.402220284761654, 126.66692173290285)], 

        color: 'orange'
    },
    {
        path: [new kakao.maps.LatLng(37.40303451562671, 126.6672993122859), new kakao.maps.LatLng(37.40233778132097, 126.66705109634992), new kakao.maps.LatLng(37.40110927561628, 126.66594406936818)], 

        color: 'orange'
    },
    
    // 60. 구립늘품 어린이집
    {
        path: [new kakao.maps.LatLng(37.408031794817674, 126.66372209091162), new kakao.maps.LatLng(37.408047139267424, 126.66436584157542), new kakao.maps.LatLng(37.40753840820419, 126.66448670853096), new kakao.maps.LatLng(37.4073881384891, 126.66392262986135), new kakao.maps.LatLng(37.40804078880119, 126.66371640317485)], 

        color: 'orange'
    },

    // 61. 새봄초등학교
    {
        path: [new kakao.maps.LatLng(37.41284219648703, 126.65709254835912), new kakao.maps.LatLng(37.409567412666064, 126.65879047532312), new kakao.maps.LatLng(37.40863211558093, 126.65628719163115)], 

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


function elasticityWindow() {
    if (!confirm("탄력구간 허용, 금지시간을 지도에 함께 표시할까요?\n\n확인 : 탄력구간 허용, 금지시간 함께 표시\n취소 : 탄력구간 선만 표시")) {
        elasticityON();
    } else {
        // 확인 누르면
        elasticityWindowON(); elasticityON();
    }
}


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



var elastin_inforwindow = [
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">연수,청학,선학</div>',

        latlng: new kakao.maps.LatLng(37.42974988093744, 126.68805197322187),
        
        
    },

    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">동춘,옥련</div>',

        latlng: new kakao.maps.LatLng(37.413002704796696, 126.65651573003171),
     
        
    },

    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">송도 1,3동</div>',

        latlng: new kakao.maps.LatLng(37.3774530380526, 126.6518907521165),
 
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">송도 2동</div>',

        latlng: new kakao.maps.LatLng(37.40308318444747, 126.64156215092412),
     
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">송도 4동</div>',

        latlng: new kakao.maps.LatLng(37.38916732495429, 126.61723719700473),
     
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">송도5동</div>',

        latlng: new kakao.maps.LatLng(37.42218605770103, 126.6161654160096),
     
        
    },


    ];




///// 인포 윈도우

var infow = [
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">연수,청학,선학</div>',

        latlng: new kakao.maps.LatLng(37.42974988093744, 126.68805197322187),
        
        
    },

    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">동춘,옥련</div>',

        latlng: new kakao.maps.LatLng(37.413002704796696, 126.65651573003171),
     
        
    },

    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">송도 1,3동</div>',

        latlng: new kakao.maps.LatLng(37.3774530380526, 126.6518907521165),
 
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">송도 2동</div>',

        latlng: new kakao.maps.LatLng(37.40308318444747, 126.64156215092412),
     
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">송도 4동</div>',

        latlng: new kakao.maps.LatLng(37.38916732495429, 126.61723719700473),
     
        
    },
    {
        Content: '<div style="padding-left:5px; padding-right:20px; padding-top:5px; padding-bottom:5px;">송도5동</div>',

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
   


function elon () {

    for (var i = 0; i < infow.length; i ++) {
        // 커스텀 오버레이를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            position: elastin_inforwindow[i].latlng,
            map: map,
            content: elastin_inforwindow[i].Content ,
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


