<?php

$oString = file_get_contents( './conf/easy.json');
$oJson   = json_decode( $oString);

$aBackground  = [];
$aEntity      = [];
$aCollectable = [];

$size = [
  "small"  => 0.1,
  "medium" => 0.2,
  "big"    => 0.3,
];

$score = [
  "small"  => 100,
  "medium" => 50,
  "big"    => 10,
];

$deg = [
  "small"  => 30,
  "medium" => 25,
  "big"    => 20,
];

$image = [
  "small"  => 90,
  "medium" => 100,
  "big"    => 120,
];

foreach( $oJson->frames as $sname => &$obj){

  $obj->centre->x = round( $obj->w/2);

  switch( $obj->type){

    case 'decoration':
      foreach($size as $sSize => $sValue){

        $aEntity[ $sname."_". $sSize] = [
            "type"=>"decoration",
            "size"=>$sSize,
            "item"=>$sname,
            "zoom"=>$sValue
        ];

      }
    break;

    case 'background':
      $aBackground[] = $sname;
      break;

    case 'collectable':
      foreach($size as $sSize => $sValue){
        
        $aEntity[ $sname."_". $sSize] = [
          "type" => "collectable",
          "size" => $sSize,
          "item" => $sname,
          "zoom" => $sValue
        ];
        
      }
      break;
    
  }

}

foreach( $aEntity as $sName => $oEntity){

  if( $oEntity["type"] == 'collectable'){
    $aCollectable["collect_".$sName] = [
        "score" => $score[ $oEntity["size"]],
        "entity"=> $sName,
        "deg"   => $deg[ $oEntity["size"]],
        "freq"  => $image[ $oEntity["size"]]
    ];
  }

}


$oJson->entity      = $aEntity;
$oJson->background  = $aBackground;
$oJson->collectable = $aCollectable;

echo json_encode( $oJson);
