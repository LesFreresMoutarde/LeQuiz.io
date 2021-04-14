<?php

namespace App\Repository;

use App\Entity\Question;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Question|null find($id, $lockMode = null, $lockVersion = null)
 * @method Question|null findOneBy(array $criteria, array $orderBy = null)
 * @method Question[]    findAll()
 * @method Question[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QuestionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Question::class);
    }

    public function findByContent($str){

        $q = $this->getEntityManager()
            ->createQuery(
                'SELECT q
                FROM App\Entity\Question q
                WHERE q.content LIKE :str
                ORDER BY q.createdAt DESC'
            );
        if ($str === '') {
            $q->setMaxResults(13);
        }
        return $q->setParameter('str', '%'.$str.'%')
            ->getResult();
    }
}
