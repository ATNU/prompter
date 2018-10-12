<?php
header('Content-Type: application/xml');
if(isset($_GET['my_data'])){
        $data=$_GET['my_data'];         
 }
$t_xml = new DOMDocument();
$t_xml->load($data);
$xml_out = $t_xml->saveXML($t_xml->documentElement);
echo "<?xml-model href=\"https://raw.githubusercontent.com/TEIC/TEI-Simple/master/teisimple.rng\" schematypens=\"http://relaxng.org/ns/structure/1.0\"?>";
echo "<?xml-stylesheet type=\"text/xsl\" href=\"http://prompter.jharrimansmith.net/dist/content/teibp.xsl\"?>";
echo $xml_out;
?>

