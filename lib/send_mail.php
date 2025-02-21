<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Content-Type: application/json");

$response = [
    "content" => '',
    "text" => '',
    "sended" => false,
    "error" => "",
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Odczytanie danych z formularza
    $fullname = isset($_POST['fullname']) ? htmlspecialchars($_POST['fullname']) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : '';
    $company = isset($_POST['company']) ? htmlspecialchars($_POST['company']) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
    $content = isset($_POST['content']) ? htmlspecialchars($_POST['content']) : '';
    $approval = isset($_POST['approval']) ? filter_var($_POST['approval'], FILTER_VALIDATE_BOOLEAN) : false;

    // Sprawdzenie, czy wymagane pola zostały wypełnione i formularz zaakceptowany
    if (!empty($fullname) && (!empty($email) || !empty($phone)) && $approval) {

        $mail = new PHPMailer(true);

        try {
            // Konfiguracja SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->Username = 'mail.kontakt.otree@gmail.com';
            $mail->Password = 'andq huvp aqyw rbdt';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->SMTPAuth = true;
            $mail->Port = 465;

            // Konfiguracja e-maila
            $mail->CharSet = "UTF-8";
            $mail->setFrom($email, $fullname);
            $mail->addAddress('bmuller@otree.tech');
            $mail->addReplyTo($email, $fullname);

            // Treść wiadomości
            $mail->isHTML(true);
            $mail->Subject = 'Formularz kontaktowy Konfigurator - Dobierz Sklep';
            $mail->Body = "
                <html>
                    <body>
                        <h1>Formularz kontaktowy Otree</h1>
                        <p><strong>Imię i nazwisko:</strong> $fullname</p>
                        <p><strong>Email:</strong> $email</p>
                        <p><strong>Firma:</strong> $company</p>
                        <p><strong>Telefon:</strong> $phone</p>
                        <p><strong>Treść:</strong> $content</p>
                    </body>
                </html>
            ";

            if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['file']['tmp_name'];
                $fileName = $_FILES['file']['name'];


                $mail->addAttachment($fileTmpPath, $fileName);
            }


            $mail->send();
            $response['text'] = 'Dziękujemy za przesłanie wiadomości!<br />
            Odpowiemy najszybciej jak to możliwe :)';
            $response['sended'] = true;
        } catch (Exception $e) {
            $response['text'] = 'Spróbuj ponownie za chwilę lub skontaktuj się z nami w inny sposób';
            $response['sended'] = false;
            $response['error'] = "Błąd: {$mail->ErrorInfo}";
        }
    } else {
        $response['text'] = 'Uzupełnij wszystkie wymagane pola. <br /> Zaakceptuj regulamin i spróbuj ponownie.';
        $response['sended'] = false;
        $response['error'] = 'Brak wymaganych pól lub niezaakceptowany formularz.';
    }
} else if (!empty($_GET['show_error'])) {
    $response = [
        "text" => '>Spróbuj ponownie za chwilę lub skontaktuj się z nami w inny sposób',
        "sended" => false,
        "error" => "Post method error",
    ];
}

echo json_encode($response);
exit();
