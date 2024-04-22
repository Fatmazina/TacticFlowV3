<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index()
    {
        $cards = Card::all();
        return view('cards.index', compact('cards'));
    }

    public function create()
    {
        return view('cards.create');
    }

    public function store(Request $request)
    {
        Card::create($request->all());
        return redirect()->route('cards.index');
    }

    public function show(Card $card)
    {
        return view('cards.show', compact('card'));
    }

    public function edit(Card $card)
    {
        return view('cards.edit', compact('card'));
    }

    public function update(Request $request, Card $card)
    {
        $card->update($request->all());
        return redirect()->route('cards.index');
    }

    public function destroy(Card $card)
    {
        $card->delete();
        return redirect()->route('cards.index');
    }
}
