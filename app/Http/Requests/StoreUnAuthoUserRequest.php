<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUnAuthoUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Vous pouvez ajuster la logique d'autorisation ici si nécessaire
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
{
    return [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:unauthorized_users,email',
        'department' => 'required|string|max:255',
        'role' => 'required|string',
    ];
}

}
