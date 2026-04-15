<!-- <?php
$subject = 'New Contact Message'; // Subject of your email
$to = 'bun8nn@gmail.com';  //Recipient's E-mail

$emailTo = $_POST['email'];
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$msg = $_POST['message'];

$email_from = $name. ' ' . '<'.$email.'>';

$headers = "MIME-Version: 1.1";
$headers .= "Content-type: text/html; charset=iso-8859-1";
$headers .= "From: ".$name.'<'.$email.'>'."\r\n"; // Sender's E-mail
$headers .= "Return-Path:"."From:" . $email;

$message .= 'Name : ' . $name . "\n";
$message .= 'Email : ' . $email . "\n";
$message .= 'Phone : ' . $phone . "\n";
$message .= 'Message : ' . $msg;

if (@mail($to, $subject, $message, $email_from))
{
	// Transfer the value 'sent' to ajax function for showing success message.
	echo 'sent';
}
else
{
	// Transfer the value 'failed' to ajax function for showing error message.
	echo 'failed';
}
?>  -->





<?php
require 'vendor/autoload.php'; // or include the library manually

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';        // Your SMTP server
$mail->SMTPAuth = true;
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom($email, $name);
$mail->addAddress('bun8nn@gmail.com');
$mail->Subject = $subject;
$mail->Body    = $message; // plain text
// $mail->isHTML(true); // if you want HTML

if ($mail->send()) {
    echo 'sent';
} else {
    echo 'failed: ' . $mail->ErrorInfo;
}
?>