<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire soumis</title>
</head>
<body>
    <h1>Nouveau formulaire soumis</h1>
    <p>Un utilisateur a soumis un nouveau formulaire sur votre site web.</p>
    <p>Voici les détails du formulaire:</p>
    <ul>
        <li>Nom: {{ $data['name'] }}</li>
        <li>Email: {{ $data['email'] }}</li>
        <li>Département: {{ $data['department'] }}</li>
    </ul>
    <p>Cordialement,</p>
    <p>Votre équipe</p>
</body>
</html>

