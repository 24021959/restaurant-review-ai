import React from 'react';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marco Rossi",
      restaurant: "Osteria del Centro",
      text: "Da quando uso RistoReply ho risparmiato 10 ore a settimana e le mie recensioni positive sono aumentate del 40%!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Giulia Bianchi", 
      restaurant: "Trattoria La Nonna",
      text: "Finalmente posso concentrarmi sulla cucina mentre RistoReply si occupa delle recensioni. Semplicemente fantastico!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1594736797933-d0d501ba2fe6?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Andrea Conti",
      restaurant: "Pizzeria Napoletana",
      text: "Le risposte sono così naturali che i clienti pensano che sia sempre io a scrivere. Incredibile!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sofia Romano",
      restaurant: "Ristorante Bellavista",
      text: "Prima impiegavo 2 ore al giorno per le recensioni. Ora posso dedicarmi completamente ai miei ospiti!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Luca Ferrari",
      restaurant: "Bistrot del Porto",
      text: "RistoReply ha trasformato la gestione delle recensioni da incubo quotidiano a processo automatico. Fantastico!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=150&h=150&fit=crop&crop=center"
    },
    {
      name: "Francesca Marino",
      restaurant: "La Tavola della Nonna",
      text: "Non devo più preoccuparmi delle recensioni negative. L'AI risponde sempre in modo professionale e cortese.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Giuseppe Lombardi",
      restaurant: "Osteria del Mare",
      text: "Incredibile come sia riuscito a liberare tempo per quello che amo davvero: cucinare per i miei clienti!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=150&h=150&fit=crop&crop=center"
    },
    {
      name: "Elena Ricci",
      restaurant: "Ristorante Il Giardino",
      text: "Le recensioni positive sono triplicate da quando uso RistoReply. I clienti apprezzano le risposte immediate!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=150&h=150&fit=crop&crop=center"
    },
    {
      name: "Matteo Verdi",
      restaurant: "Pizzeria Margherita",
      text: "Prima perdevo notti di sonno per le recensioni negative. Ora RistoReply gestisce tutto con professionalità.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cosa Dicono I Nostri Clienti
          </h2>
          <p className="text-lg text-gray-600">
            Ristoratori che hanno smesso di perdere tempo con le recensioni
          </p>
        </div>
        
        <div className="relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.restaurant}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
