
import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marco Rossi",
      restaurant: "Osteria del Centro",
      text: "Da quando uso RistoReply ho risparmiato 10 ore a settimana e le mie recensioni positive sono aumentate del 40%!",
      rating: 5
    },
    {
      name: "Giulia Bianchi", 
      restaurant: "Trattoria La Nonna",
      text: "Finalmente posso concentrarmi sulla cucina mentre RistoReply si occupa delle recensioni. Semplicemente fantastico!",
      rating: 5
    },
    {
      name: "Andrea Conti",
      restaurant: "Pizzeria Napoletana",
      text: "Le risposte sono così naturali che i clienti pensano che sia sempre io a scrivere. Incredibile!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cosa Dicono I Nostri Clienti
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.restaurant}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
