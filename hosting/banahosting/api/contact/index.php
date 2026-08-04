<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['ok' => false, 'error' => 'Método no permitido.']);
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') === false) {
    http_response_code(415);
    echo json_encode(['ok' => false, 'error' => 'Formato no compatible.']);
    exit;
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Solicitud inválida.']);
    exit;
}

function clean_text(mixed $value, int $maxLength): string
{
    $text = is_string($value) ? trim($value) : '';
    $text = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $text) ?? '';
    return mb_substr($text, 0, $maxLength);
}

$nombre = clean_text($data['nombre'] ?? '', 120);
$empresa = clean_text($data['empresa'] ?? '', 120);
$correo = clean_text($data['correo'] ?? '', 180);
$telefono = clean_text($data['telefono'] ?? '', 60);
$interes = clean_text($data['interes'] ?? '', 60);
$mensaje = clean_text($data['mensaje'] ?? '', 3000);

$requiredValid = $nombre !== ''
    && filter_var($correo, FILTER_VALIDATE_EMAIL)
    && $telefono !== ''
    && $interes !== ''
    && $mensaje !== '';

if (!$requiredValid) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Revisa los campos requeridos.']);
    exit;
}

$interestLabels = [
    'inversion' => 'Inversión',
    'alianza' => 'Alianza estratégica',
    'venta-activo' => 'Venta de activo',
    'proyecto-inmobiliario' => 'Proyecto inmobiliario',
    'otro' => 'Otro',
];

$interesLabel = $interestLabels[$interes] ?? $interes;
$escape = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

$rows = [
    ['Nombre', $nombre],
    ['Empresa', $empresa],
    ['Correo', $correo],
    ['Teléfono', $telefono],
    ['Interés', $interesLabel],
    ['Mensaje', nl2br($escape($mensaje))],
];

$tableRows = '';
foreach ($rows as [$label, $value]) {
    if ($value === '') {
        continue;
    }

    $safeValue = $label === 'Mensaje' ? $value : $escape($value);
    $tableRows .= '<tr>'
        . '<td style="padding:10px 12px;border-bottom:1px solid #d9d6cf;color:#041f49;font-weight:600;vertical-align:top">' . $escape($label) . '</td>'
        . '<td style="padding:10px 12px;border-bottom:1px solid #d9d6cf;color:#1c1c1c">' . $safeValue . '</td>'
        . '</tr>';
}

$html = '<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">'
    . '<div style="background:#041f49;padding:24px 28px;color:#fff">'
    . '<strong style="letter-spacing:.12em">ZAIAH · NUEVA SOLICITUD</strong>'
    . '</div>'
    . '<table style="width:100%;border-collapse:collapse;background:#faf9f7">' . $tableRows . '</table>'
    . '</div>';

$subject = 'Nueva solicitud ZAIAH - ' . preg_replace('/[^\p{L}\p{N}\s._-]/u', '', $nombre);
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$recipients = 'mkt@zaiah.com.mx, alpeva96@gmail.com';
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ZAIAH Formulario <mkt@zaiah.com.mx>',
    'Reply-To: ' . $correo,
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = mail($recipients, $encodedSubject, $html, implode("\r\n", $headers), '-fmkt@zaiah.com.mx');

if (!$sent) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'No fue posible enviar el mensaje.']);
    exit;
}

echo json_encode(['ok' => true]);
