<?php

namespace App\Repository;

use App\Entity\Question;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

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

    public function findByContent(Request $request){

        $str = $request->get('str');
        $type = $request->get('type');
        $difficulty = $request->get('difficulty');
        $category = $request->get('category');
        $status = $request->get('status');

        $qb = $this->createQueryBuilder('q');
        $qb->select('q')
            ->join('q.categories', 'c')
            ->join('q.types', 't')
            ->andWhere('q.content LIKE :str')
            ->orWhere('q.answer LIKE :str');


        if ($category != '---') {
            $qb->andWhere('c.name = :category')
                ->setParameter('category', $category);
        }

        if ($type != '---') {
            $qb->andWhere('t.name = :type')
                ->setParameter('type', $type);
        }

        if ($difficulty != '---') {
            $qb->andWhere('q.difficulty = :difficulty')
                ->setParameter('difficulty', $difficulty);
        }

        if ($status != '---') {
            $qb->andWhere('q.status = :status')
                ->setParameter('status', $status);
        }


        return $qb->orderBy('q.createdAt', 'DESC')
            ->setParameter('str', '%'.$str.'%')
            ->getQuery()
            ->getResult();
    }
}
