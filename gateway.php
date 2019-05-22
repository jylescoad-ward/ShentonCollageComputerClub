<?php
	$page = "false";
	if($page === "home"){
		header("Location: http://computerclub/");
	}
	elseif ($id === "registration") {
		header("Location: https://goo.gl/forms/WNHCHnam4IDz6Jzq1");
	}
	elseif ($id === "teams"){
		header("Location: https://docs.google.com/document/d/1GNM9Qwg0KFl9mBl5hAtTkj7iPB5WhQRivPq5NiJNw7c/view");
	}
	elseif (id === "challenges"){
		header("Location: http://shenton_au.libguides.com/clubs/computerclub");
	}
	elseif ($page === "chatroom"){
		header("Location: http://computerlcub/chat");
	}
	elseif ($page === "php-collab"){
		header("Location: http://computerclub/~coderdojo/colab");
	}
	elseif ($page === "angus"){
		header("Locaiton: http://computerclub/~coderdojo");
	}
	else{
		header('Location: ' . $_SERVER['HTTP_REFERER']);
	}
?>