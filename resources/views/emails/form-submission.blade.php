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
        <li>Nom: {{ $name }}</li>
        <li>Email: {{ $email }}</li>
        <li>Département: {{ $department }}</li>
        <li>Département: {{ $role }}</li>
    </ul>
    <p>Cordialement,</p>
    <p>Votre équipe</p>
</body>
</html>

