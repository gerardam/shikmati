<?php
//Busqueda exacta
if($_GET['lang'] == "es"){
// Conectando, seleccionando la base de datos
$dsn = "Driver={SQL Server};Server=qhncpzmmlz.database.windows.net;Database=shikmatiBD;Integrated Security=SSPI;Persist Security Info=False;";
$conn = odbc_connect( $dsn, 'gerardam', '10TENsaiga6' );
if (!$conn) { 
    exit( "Error al conectar: " . $conn);
}

$consulta = "SELECT TOP 5 * FROM espanolnahuatl WHERE espanol='".$_POST['termino']."'";
// Se ejecuta la consulta y se guardan los resultados en el recordset rs
$rs = odbc_exec( $conn, $consulta );
if ( !$rs ) { 
    exit( "Error en la consulta SQL" ); 
}

// Se muestran los resultados
while ( $resultado=odbc_fetch_array($rs) ) {
echo ' <div class="resultado">
            <div class="izquierda">
                '.$resultado['espanol'].'
            </div>
            <div class="derecha">
                '.$resultado['nahuatl'].'
            </div>
        </div>';
}
// Se cierra la conexión
odbc_close( $conn );
//Busqueda aproximada

// Conectando, seleccionando la base de datos
$dsn = "Driver={SQL Server};Server=qhncpzmmlz.database.windows.net;Database=shikmatiBD;Integrated Security=SSPI;Persist Security Info=False;";
$conn = odbc_connect( $dsn, 'gerardam', '10TENsaiga6' );
if (!$conn) { 
    exit( "Error al conectar: " . $conn);
}

$consulta = "SELECT TOP 5 * FROM espanolnahuatl WHERE espanol LIKE '%".$_POST['termino']."%'";
// Se ejecuta la consulta y se guardan los resultados en el recordset rs
$rs = odbc_exec( $conn, $consulta );
if ( !$rs ) { 
    exit( "Error en la consulta SQL" ); 
}

// Se muestran los resultados
while ( $resultado=odbc_fetch_array($rs) ) {
echo ' <div class="resultado">
            <div class="izquierda">
                '.$resultado['espanol'].'
            </div>
            <div class="derecha">
                '.$resultado['nahuatl'].'
            </div>
        </div>';
}
// Se cierra la conexión
odbc_close( $conn );
}
?>