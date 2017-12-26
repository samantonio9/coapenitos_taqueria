<?php

require 'twig.php';

$params = array(
	'title' => 'Vuelatour ',
	// 'op' => $op,
	// 'cont' => $cont[principal]
);
##Hola subisssss
$template = $twig->load('main.twig');
echo $template->render($params);
?>