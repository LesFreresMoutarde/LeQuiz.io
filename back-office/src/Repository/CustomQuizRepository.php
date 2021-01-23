<?php

namespace App\Repository;

use App\Entity\CustomQuiz;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CustomQuiz|null find($id, $lockMode = null, $lockVersion = null)
 * @method CustomQuiz|null findOneBy(array $criteria, array $orderBy = null)
 * @method CustomQuiz[]    findAll()
 * @method CustomQuiz[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CustomQuizRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CustomQuiz::class);
    }

    // /**
    //  * @return CustomQuiz[] Returns an array of CustomQuiz objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CustomQuiz
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
