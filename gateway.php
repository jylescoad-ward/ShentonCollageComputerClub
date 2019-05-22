<?php
	//$page = "false";

	$ipAddress = $_SERVER['REMOTE_ADDR'];
    date_default_timezone_set('Australia/Perth');
	$currentDate = date('m/d/Y h:i:s a', time());
	echo($page);

	function writeLog($note){
        $file = fopen("log.txt","a");

        //Write Useful Information to the Log
        fwrite("Date: ".currentDate."<br>");
        fwrite("IP Address: ".ipAddress."<br>");
        fwrite("Destination: ".page."<br>");
        fwrite("Note: ".note."<br><br><br>");

        fclose($file);
	}

	if($page = "home" || $page = "index") {
		header("Location: http://computerclub/");
		echo("home or index");
	} else{
	    if ($page = "registration") {
            header("Location: https://goo.gl/forms/WNHCHnam4IDz6Jzq1");
            echo "register";
        } else {
	        if ($page = "teams") {
                header("Location: https://docs.google.com/document/d/1GNM9Qwg0KFl9mBl5hAtTkj7iPB5WhQRivPq5NiJNw7c/view");
                echo "teams";
            } else{
	            if ($page = "challenges") {
                    header("Location: http://shenton_au.libguides.com/clubs/computerclub");
                    echo "challenges";
                } else{
	                if ($page = "chat") {
                        header("Location: http://computerlcub/chat");
                        echo "chat";
                    } else{
	                    if ($page = "collab") {
                            header("Location: http://computerclub/~coderdojo/colab");
                            echo "collab";
                        } else{
	                        if ($page = "angus") {
                                header("Locaiton: http://computerclub/~coderdojo");
                                echo "Coder Dojo";
                            } else{
	                            if ($page !== "angus" || "collab" || "chat" || "challenges" || "teams" | "registration" || "index" || "home") {
                                    die('Forbidden');
                                    echo "Forbidden";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
?>