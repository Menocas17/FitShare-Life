import { supabase } from '@/lib/supabase';

export default async function Testing() {
  try {
    const { data, error } = await supabase.from('excercises').select();

    if (error) {
      console.error('Error al consultar:', error);
    } else {
      console.log('Datos obtenidos:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }

  return <h1>Testing</h1>;
}
