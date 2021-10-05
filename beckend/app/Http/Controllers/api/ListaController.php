<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\lista;

class ListaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return lista::all();
    }

    public function store(Request $request)
    {
        lista::create($request->all());
    }

    public function show($id)
    {
        return lista::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $lista = lista::findOrFail($id);
        $lista->update($request->all());
    }

    public function destroy($id)
    {
        $lista = lista::findOrFail($id);
        $lista->delete();
    }
}
