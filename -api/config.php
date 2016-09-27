<?php
session_start();

//====================================================
// FUNKTION TIL ETABLERING AF FORBINDELSE TIL DATABASE
//====================================================
function mydb_connect()
{
	$db = mysql_connect("localhost", "mytraili_funga", "by6m946UtHxEp76GmAYw6xu");
	if ( $db == 0 )
	{
//		echo("Ingen forbindelse til databasen");
		error("Ingen forbindelse til databasen");
	}
	$database = "mytraili_funga";
	if ( mysql_select_db($database, $db) == 0 )
	{
//		echo("Kunne ikke vælge databasen: ’$database’");
		error("Kunne ikke vælge databasen: ’$database’");
	}
}
mydb_connect();
?>
