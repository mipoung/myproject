

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(); 

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.40960506201756, 126.67865875458125), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

//
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
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
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
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



//소화전, 탄력구간 배열
//var fireplug = []
//var elasticity = []






// 여러개 배열 만들고 data라는 배열 값으로 합쳐 하나의 배열로 만들기
var data = [
    ...child,
]



    
//배열 이용해서 폴리라인 여러개 표시하기
for(var i=0; i<data.length; i++) {

    //i번째 정보를 가져옵니다.
    var item = data[i];

    // 지도에 표시할 선을 생성합니다
	var polyline = new kakao.maps.Polyline({

        map: map, //지도에 선을 표시합니다.
    	path: item.path, // 선을 구성하는 좌표배열 입니다
	    strokeWeight: 7, // 선의 두께 입니다
    	strokeColor: item.color, // 선의 색깔입니다
	    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    	strokeStyle: 'solid' // 선의 스타일입니다
	});

}

// 지도에 선을 표시합니다 
polyline.setMap(map);  
