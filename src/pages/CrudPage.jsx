import React from 'react';
import { CrudProvider } from '../contexts/CrudContext';
import { CrudForm } from '../components/CrudForm';
import { CrudTable } from '../components/CrudTable';
import { Header } from '../components/Header';

export const CrudPage = () => {
    return (
        <CrudProvider>
            <Header />
            <main className="container-fluid py-4">
                <div className="row">
                    {/* Columna del Formulario */}
                    <div className="col-lg-4">
                        <CrudForm />
                    </div>
                    {/* Columna de la Tabla */}
                    <div className="col-lg-8">
                        <CrudTable />
                    </div>
                </div>
            </main>
        </CrudProvider>
    );
};