<?php

namespace App\Form;

use App\Entity\Question;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class QuestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('types')
            ->add('difficulty')
            ->add('content')
//            ->add('answer')
            ->add('status')
//            ->add('media')
//            ->add('createdAt')
//            ->add('updatedAt')
            ->add('categories')
            ->add('position') //Affichage a conditionner en front avec Twig (si Question a Custom Quiz)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Question::class,
        ]);
    }
}
