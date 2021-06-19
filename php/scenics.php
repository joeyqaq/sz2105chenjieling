<?php
include './mysql.php';
$pid = $_GET['pid'];

$sql = "SELECT * FROM `scenics` WHERE pid = $pid and isshowindex=1";
// echo $sql;die;
$res = mysqli_query($link,$sql);
$arr = [];

while($row=mysqli_fetch_assoc($res)){
  array_push($arr,$row);
}
echo json_encode([
  'message'=>[
    'status'=>0,
    'msg'=>"获取成功"
  ],
  'data'=>$arr
]);