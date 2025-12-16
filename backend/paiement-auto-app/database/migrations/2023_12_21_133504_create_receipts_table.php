<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('receipts', function (Blueprint $table) {
            $table->id();
            $table->string('nomComplet');
            $table->string('paymentType');
            $table->date('date');
            $table->string('dossierNumber');
            $table->string('amount');
            $table->string('phoneNumber');
            $table->string('classe');
            $table->string('paymentReason');
            // Ajoutez d'autres colonnes au besoin
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipts');
    }
};
