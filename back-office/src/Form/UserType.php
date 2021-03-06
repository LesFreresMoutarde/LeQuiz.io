<?php

namespace App\Form;

use App\Entity\User;
use App\Util\Enums;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $userPlans = [];
        $userRoles = [];

        foreach (Enums::USER_PLANS as $key => $value) $userPlans[$value] = $value;
        foreach (Enums::USER_ROLES as $key => $value) $userRoles[$value] = $value;

        $builder
            ->add('username')
            ->add('email', EmailType::class)
            ->add('password', PasswordType::class)
//            ->add('passwordResetToken')
//            ->add('lastResetPasswordEmailSendDate')
            ->add('plan', ChoiceType::class, [
                'choices' => $userPlans
            ])
            ->add('role', ChoiceType::class, [
                'choices' => $userRoles
            ])
            ->add('isTrustyWriter')
            ->add('isActive', CheckboxType::class, [
                'data' => true
            ])
//            ->add('isBanned')
//            ->add('unbanDate')
//            ->add('deletedAt')
//            ->add('createdAt')
//            ->add('updatedAt')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
