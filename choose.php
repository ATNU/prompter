<html>
<head>
<title>The Cyborg Prompter</title>
<link rel="stylesheet" href="http://prompter.jharrimansmith.net/styles.css">
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="http://prompter.jharrimansmith.net/scripts2.js"></script> 
</head>
<?php
echo "<body onLoad=\"partMaker('http://prompter.jharrimansmith.net/examples/" .$_POST['Example']. ".xml'); charList()\">"
?>
<div id="patience"><h1>Please wait...</h1>
<img src="/ornament-trumpet.jpg" />
</div>


<div id="desk">
	<div id="explanation">
		<p> Welcome to the prompter's desk. You must now give instructions on the kind of part to prepare for this play.</p>
		<p>First, select how much of a cue the actor will receive for each of his or her lines. In Shakespeare's time, cues were rarely longer than a single word. By the late eighteenth century, longer cues were more common.</p>
		<p>Second, choose which speeches make up the part your are preparing. Often, this will simply be a case of picking a character's name. However, some scripts refer to a character by different names ('Lady Revel' could be 'Lady R.' or just 'Lady'; 'Gravedigger' could be the same character as 'Clown'; etc.). If this is happening in your play, hold CTRL to select multiple names from the menu.</p>
		<p>Third, press the button to generate the finished part. You can then print off this document for your records, generate other parts or change plays entirely.</p>
		<p>Finally, be sure to consult the full text of the play. You can use this to check if characters go by different names, but can also use it to mark up the printed parts by hand with additional information: just as a real prompter would have done in the past.</p>
	<?php
		echo "<button onClick=\"fullPlay('http://prompter.jharrimansmith.net/examples/" .$_POST['Example']. ".xml')\">"
		?>Look at the Full Play</button>
	</div>
	
	<div id="selectionMenu"><p>Choose the speech headings for your part:</p></div>
	
	<div id="selection">
			<div id="cueSize">
				<p>
				Select the length of your cue lines:<br >
				<input type="radio" id="r1" name="size" value="1" checked="checked"> One Word (16th & 17th Century)<br >
				<input type="radio" id="r2" name="size" value="2"> Two Words (17th & 18th Century)<br >
				<input type="radio" id="r2" name="size" value="4"> Four Words (18th Century)<br >
				<input type="radio" id="r3" name="size" value="full" > Full Line
				</p>
			</div>
			<div id="generate">
				<button onclick="displayPart()">Generate the Part</button>
			</div>
	</div>
	
	
</div>

<div id="desk2">
	<div id="part" style="display:none">
	</div>

	<div id="results">
		<p>
			<button onClick="printer()"> Print the Part</button>
			<?php
			echo "<button onClick=\"fullPlay('http://prompter.jharrimansmith.net/examples/" .$_POST['Example']. ".xml')\">"
			?>Look at the Full Play</button>
			<?php
			echo "<button onClick=\"restart('http://prompter.jharrimansmith.net/examples/" .$_POST['Example']. ".xml')\">"
			?>Generate a Different Part</button>
			<a href="/"><button>Choose a Different Play</button></a>
		</p>	
	</div>
</div>
	
<div id="footer">
<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA 3.0</a> | Designed by James Harriman-Smith | <a href="mailto:mail@jharrimansmith.net">Feedback</a> | <a href="/faqs.html">FAQs</a>
</div>
</body>
</html>