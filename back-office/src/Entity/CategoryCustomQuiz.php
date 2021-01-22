<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CategoryCustomQuiz
 *
 * @ORM\Table(name="category_custom_quiz", indexes={@ORM\Index(name="IDX_12FF7004C4A4EA2C", columns={""categoryId""}), @ORM\Index(name="IDX_12FF700447601D74", columns={""customQuizId""})})
 * @ORM\Entity
 */
class CategoryCustomQuiz
{
    /**
     * @var string
     *
     * @ORM\Column(name="categoryId", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $categoryid;

    /**
     * @var string
     *
     * @ORM\Column(name="customQuizId", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $customquizid;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetimetz", nullable=false)
     */
    private $createdat;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="datetimetz", nullable=false)
     */
    private $updatedat;

    /**
     * @var \Category
     *
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""categoryId"", referencedColumnName="id")
     * })
     */
    private $"categoryid";

    /**
     * @var \CustomQuiz
     *
     * @ORM\ManyToOne(targetEntity="CustomQuiz")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""customQuizId"", referencedColumnName="id")
     * })
     */
    private $"customquizid";


}
