<?php
	// function getUserLanguage() {
	// 	$language = 'en';
	// 	// $language = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 2);
	// 	return $language;
	// }

	// if(!isset($_COOKIE["lang"])) {
	// 	$lang = getUserLanguage();
	// 	$cookieLang = "";
	// 	($lang == "es") ? $cookieLang = "Spanish" : (($lang == "pt") ? $cookieLang = "Portuguese" : $cookieLang = "English");
	// 	setcookie('lang', $cookieLang, time() + (86400 * 30));
	// 	// header("Location: /");
	// }

	// $cookie = (isset($_COOKIE["lang"])) ? $_COOKIE["lang"] : "";
	// if($cookie == "Spanish"){
	// 	$language = 'es';
	// 	include "array-espanol.php";
	// }
	// else if($cookie == "Portuguese"){
	//     $language = 'pt';
	//     include "array-portugues.php";
	// }
	// else {
	// 	$language = 'en';
	// 	include "array-ingles.php";
	// }
	// include "array-ingles.php";
	
	require_once 'vendor/autoload.php';

	$loader = new Twig_Loader_Filesystem('views');
	$twig = new Twig_Environment($loader, array(
			'debug' => true
	));
	$twig->addExtension(new Twig_Extensions_Extension_Array());
	$twig->addExtension(new Twig_Extensions_Extension_Text());
	$twig->addExtension(new Twig_Extension_Debug());
?>
